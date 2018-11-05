<?php
if (!isset($_POST['to'])) {
    $data = array_keys($_POST)[0];
    $data = (array)json_decode($data);
} else {
    $data = $_POST;
}
if (!isset($data['to'])) {
    die('Not allowed');
}



$to = $data['to'] ?: 'pgaming.kz@gmail.com';
$message = $data['message'] ?:'Empty body';
$subject = $data['subject'] ?: 'Mail from Progress Gaming';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Progress Gaming Mailer <info@progressgaming.kz>\r\n";
mail($to, $subject, $message, $headers);
mail('pgaming.kz@gmail.com', $subject, $message, $headers);
echo "Mail «".$subject."» sent to ".$to;
