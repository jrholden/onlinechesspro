<?php
/**
 * Created by PhpStorm.
 * User: Jdawgscomp
 * Date: 2016-12-20
 * Time: 8:08 PM
 */
require 'chat.php';
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Chat;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();