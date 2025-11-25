<?php
    class DataBase{
        #  Conexión Local
        // public static function connection(){
        //     $hostname = "localhost";
        //     $port = "3306";
        //     $database = "database_php";
        //     $username = "root";
        //     $password = "";
		// 	$pdo = new PDO("mysql:host=$hostname;port=$port;dbname=$database;charset=utf8",$username,$password);
		// 	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// 	return $pdo;
		// }
        
        ## Conexión Azure
        public static function connection(){
            $hostname = "serverphplimpio.mysql.database.azure.com";
            $port = "3306";
            $database = "database_php";
            $username = "admin_database";
            $password = getenv('DB_PASSWORD');
            $options = array(
                PDO::MYSQL_ATTR_SSL_CA => 'assets/database/DigiCertGlobalRootG2.crt.pem'
            );
            $pdo = new PDO("mysql:host=$hostname;port=$port;dbname=$database;charset=utf8",$username,$password,$options);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        }
        
	}
?>