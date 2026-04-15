<?php

class Database {
    private static $connection = null;
    
    public static function connect() {
        if (self::$connection === null) {
            try {
                self::$connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
                
                if (self::$connection->connect_error) {
                    throw new Exception('Database connection failed: ' . self::$connection->connect_error);
                }
                
                self::$connection->set_charset("utf8mb4");
            } catch (Exception $e) {
                die(json_encode(['error' => $e->getMessage()]));
            }
        }
        
        return self::$connection;
    }
    
    public static function query($sql, $types = '', $params = []) {
        $conn = self::connect();
        
        if ($types && count($params) > 0) {
            $stmt = $conn->prepare($sql);
            
            if (!$stmt) {
                throw new Exception('Prepare failed: ' . $conn->error);
            }
            
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            
            return $stmt;
        } else {
            $result = $conn->query($sql);
            
            if (!$result) {
                throw new Exception('Query failed: ' . $conn->error);
            }
            
            return $result;
        }
    }
    
    public static function getConnection() {
        return self::connect();
    }
}
?>
