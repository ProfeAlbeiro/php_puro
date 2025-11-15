<?php
    require_once "models/User.php";
    class Logout{
        public function main(){
            session_destroy();
            header("Location:/");
        }
    }
?>