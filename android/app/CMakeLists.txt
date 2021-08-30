cmake_minimum_required(VERSION 3.4.1)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(cpp-code
            SHARED
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp-code/src/include
)

file(GLOB BOOST_LIBS
        "/home/igor/workarea/mobiletwm/android/cpp-code/libboost*.a"
        )


target_link_libraries( cpp-code
        /home/igor/workarea/mobiletwm/android/cpp-code/libwallet_merged.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libepee.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libeasylogging.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libssl.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libcrypto.a
        /home/igor/workarea/mobiletwm/android/cpp-code/liblmdb.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libunbound.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libpcsclite.a
        /home/igor/workarea/mobiletwm/android/cpp-code/librandomx.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libblocks.a
        /home/igor/workarea/mobiletwm/android/cpp-code/libblockchain_db.a
        log
        ${BOOST_LIBS})