<?php
/**
 * Created by PhpStorm.
 * User: Jdawgscomp
 * Date: 2016-12-20
 * Time: 7:53 PM
 */

namespace MyApp;
require dirname(__DIR__) . '/vendor/autoload.php';
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $client1, $client2, $room, $move;

    public function __construct()
    {
        $this->clients = Array();
        $this->room = 0;
        /*$this->client1 = Array();
        $this->client2 = Array();*/
        $this->move = true;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // Store the new connection to send messages to later
        
        
        $this->clients[$conn->resourceId] = array('conn' => $conn, 'room' => $this->room, 'player' => "");

        echo "New connection! ({$conn->resourceId}) in ({$this->room})\n";
       


        if($this->move) {
           // $client = $this->clients[$conn->resourceId];
            //$arr = array('msg' => "connected", 'player' => "white",'id'=> $conn->resourceId);
            //$this->client1 = $arr;
            $this->clients[$conn->resourceId]['player'] = "white";
            
            $this->move = false;
           
           
        }else{
           
            //$arr = array('msg' => "connected", 'player' => "black", 'id'=> $conn->resourceId);
            
            //$this->client2 = $arr;
            //$this->move = false;
            $this->clients[$conn->resourceId]['player'] = "black";
            
            foreach ($this->clients as $key => $clients) {
                if($clients['room'] === $this->room  ) {
                    $arr = array('msg' => "connected", 'player' => "black");
                    echo "sent message to {$clients['conn']->resourceId} Room Number: {$clients['room']} Current Room: {$this->room}\n";
                    $clients['conn']->send(json_encode($arr));
                }
            }
            $this->room = $this->room+1;
            $this->move = true;
        }
        //$this->twoPlayers();

    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        foreach ($this->clients as $key => $client) {
            if ($from !== $client['conn'] && $this->clients[$from->resourceId]['room'] == $client['room']) {
                if($this->clients[$from->resourceId]['player'] === "white") {
                    $arr = array('msg' => $msg, 'player' => "white");
                }else{
                    $arr = array('msg' => $msg, 'player' => "black");
                }
                $client['conn']->send( json_encode($arr));
                // The sender is not the receiver, send to each client connected
                //$client->send($msg);
            }
        }
        // Send a message to a known resourceId (in this example the sender)
       /* $client = $this->clients[$from->resourceId];
        $arr = array('msg' => $msg, 'move' => "opponent");
        $client->send( json_encode($arr));*/

        /*$numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        foreach ($this->clients as $client) {
            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
                $client->send($msg);
            }
        }*/
    }

    public function onClose(ConnectionInterface $conn)
    {
        // The connection is closed, remove it, as we can no longer send it messages
        if(isset($this->clients[$conn->resourceId])) {
            $temp = $this->clients[$conn->resourceId];
            unset($this->clients[$conn->resourceId]);
            foreach ($this->clients as $key => $client) {
                if ($temp['room'] === $client['room']) {
                    $arr = array('msg' => "disconnect", 'player' => "");
                    $client['conn']->send(json_encode($arr));
                    echo "Connection {$client['conn']->resourceId} has disconnected becasue player left\n";
                    unset($this->clients[$client['conn']->resourceId]);

                }
            }
            $this->room = $this->room - 1;
            /*//white player left
            if($this->clients[$conn->resourceId]){
                $this->move = true;
            }
            //black player left
            else{
                
            }*/

            echo "Connection {$conn->resourceId} has disconnected\n";
        }
        /*$this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";*/
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
