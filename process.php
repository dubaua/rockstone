<?php
header('Content-type: application/json');
$data = json_decode(file_get_contents('php://input'), true); 

// set sender, recipient and subject
$headers = "Content-Type: text/html; charset=UTF-8";
$from = 'root@rockstone.dev';
$to = 'dubaua@gmail.com';
$subject = stripcslashes(htmlspecialchars($data[subject]));
$message = '';

foreach ($data[form_data] as $k => $v) {
	$label = stripcslashes(htmlspecialchars($v[label]));
	$field = stripcslashes(htmlspecialchars($v[data]));
    $message .= '<p>' . $label . ': <strong>' . $field . '</strong></p>';
}
echo mail($to,$subject,$message,$headers);
?>
