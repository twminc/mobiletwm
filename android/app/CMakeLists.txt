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
        "${CMAKE_SOURCE_DIR}/../cpp-code/libboost*.a"
        )


target_link_libraries( cpp-code
        ${CMAKE_SOURCE_DIR}/../cpp-code/libwallet_merged.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libepee.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libeasylogging.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libssl.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libcrypto.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/liblmdb.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libunbound.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libpcsclite.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/librandomx.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libblocks.a
        ${CMAKE_SOURCE_DIR}/../cpp-code/libblockchain_db.a
        log
        ${BOOST_LIBS})