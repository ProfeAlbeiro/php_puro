<?php
class Dashboard{

    public function main(){
        $session = $_SESSION['session'];
        require_once "views/roles/".$session."/". $session.".view.php";
    }
}
?>