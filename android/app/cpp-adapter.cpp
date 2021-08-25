#include <jni.h>
#include "wallet_api.h"

using SafexNativeWallet = Safex::Wallet;
using SafexNativeWalletListener = Safex::WalletListener;
using SafexNativeWalletManager = Safex::WalletManager;
using SafexNativeWalletManagerFactory = Safex::WalletManagerFactory;
using SafexNativePendingTransaction = Safex::PendingTransaction;
using SafexNativeTransactionInfo = Safex::TransactionInfo;
using SafexNativeTransactionHistory = Safex::TransactionHistory;
using SafexNativeAddressBook = Safex::AddressBook;
using SafexNativeAddressBookRow = Safex::AddressBookRow;
using SafexNativeSafexAccount = Safex::SafexAccount;
using SafexNativeSafexOffer = Safex::SafexOffer;
using SafexNativeSafexFeedback = Safex::SafexFeedback;


SafexNativeWallet *wallet_;

extern "C"
JNIEXPORT jint
Java_com_mobiletwm_NativeModule_createWallet(JNIEnv *env, jclass type, jstring str) {
    auto manager = SafexNativeWalletManagerFactory::getWalletManager();

    if (!manager)
        return 0;

    std::string res = std::string(env->GetStringUTFChars(str, 0));

    if (manager->walletExists(res)) {
        return 0;

    }

    wallet_ = manager->createWallet(res, "", "english", Safex::NetworkType::MAINNET);

    if (!wallet_) {
        return 0;
    }

    if (!wallet_->errorString().empty()) {
        return 0;
    }

    if (!wallet_->init("127.0.0.1:37000")) {
        return 0;
    }

    wallet_->setTrustedDaemon(true);

    wallet_->startRefresh();

    return 1;
}