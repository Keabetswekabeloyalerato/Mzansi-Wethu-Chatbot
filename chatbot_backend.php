<?php
// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$config = [
    'host' => 'localhost',
    'username' => 'Sithoko',
    'password' => 'Matric2020',
    'database' => 'ward database'
];

// Function to connect to the database
function connectToDatabase($config) {
    try {
        $conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    } catch (Exception $e) {
        die(json_encode(['error' => $e->getMessage()]));
    }
}

// Function to sanitize input
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

// Function to get ward number
function getWardID($conn, $area) {
    $sanitizedArea = $conn->real_escape_string($area);
    $query = "SELECT Ward_Number FROM wards WHERE Area = '$sanitizedArea' ";
    
    try {
        $result = $conn->query($query);
        if ($result === false) {
            throw new Exception("Query failed: " . $conn->error);
        }
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row["Ward_Number"];
        } else {
            return null;
        }
    } catch (Exception $e) {
        error_log($e->getMessage());
        return null;
    }
}

// Main logic
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = connectToDatabase($config);
    
    $input = json_decode(file_get_contents("php://input"), true);
    $area = isset($input['area']) ? sanitizeInput($input['area']) : '';
    
    if (empty($area)) {
        echo json_encode(['error' => 'No area provided']);
    } else {
        $WardID = getWardID($conn, $area);
        if ($WardID !== null) {
            echo json_encode(['WardID' => $WardID]);
        } else {
            echo json_encode(['error' => 'Ward number not found for the given area']);
        }
    }
    
    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
Last edited