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



$to = $data['to'] ?: 'erbcreedok@gmail.com';
$message = $data['message'] ?:'Empty body';
$subject = $data['subject'] ?: 'Mail from Elefanto';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: ElefantoMailer <mailer@blocks.kz>\r\n";
mail($to, $subject, $message, $headers);
echo "Mail «".$subject."» sent to ".$to;
