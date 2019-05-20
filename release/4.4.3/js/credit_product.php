<?php
function mysql_fetch_all($result) {
   while($row=mysql_fetch_array($result)) {
       $return[] = $row;
   }
   return $return;
}
if(isset($_COOKIE['signature'])&&isset($_GET['result'])){
	$signature=$_COOKIE['signature'];
	unset($_COOKIE['signature']);
	setcookie('signature',null,-1);
	$statusesDecode=array(
		'cancel'=>'Платеж отменен (клиентом)',
		'success'=>'Платеж успешно совершен',
		'error'=>'Ошибка при создании платежа'
	);
	$message=$statusesDecode[$_GET['result']];
	$signature=mysql_real_escape_string($signature);
	$credit_query=db_query("
		SELECT * 
		FROM SC_credits 
		WHERE 
			token='{$signature}'
	");

	$credit_fetch=db_fetch_row($credit_query);
	$product_articul=$credit_fetch['product_articul'];
	$email=$credit_fetch['email'];

	$product_query=db_query("
		SELECT *
		FROM SC_products 
		WHERE 
			product_code='{$product_articul}'
	");
	$product_fetch=db_fetch_row($product_query);
	$slug=$product_fetch['slug'];

	$words='credit_mail_title';
	$langid=array('ru'=>1,'en'=>2,'uk'=>3);
	$lang_id=$langid[$cur_lang->iso2];
	$dbres = db_query("
		SELECT value 
		FROM SC_local 
		WHERE 
			id='$words' AND lang_id='{$lang_id}'
	");
	$credit_fetch_lan=db_fetch_row($dbres);
	$subject=$credit_fetch_lan['value'];

	$smarty->assign('type','status');
	$smarty->assign('lang',$cur_lang->iso2);
	$smarty->assign('status',$message);
	$smarty->assign('text',$message);
	
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	$smarty->assign('text',$message);
	
	
	if($credit_fetch['email']!='')
		mail($email,$subject,$smarty->fetch('sending_email.tpl.html'),"From: <order@130.com.ua>\nContent-type: text/html; charset=UTF-8\r\n"); // Рассылка пользователю
	header("Location: /$cur_lang->iso2/product/$slug/?endcredit=reddir&result=".$_GET['result']);
	exit;
}
function check_mobile_devic(){ 
	$mobile_agent_array = array('ipad', 'iphone', 'android', 'pocket', 'palm', 'windows ce', 'windowsce', 'cellphone', 'opera mobi', 'ipod', 'small', 'sharp', 'sonyericsson', 'symbian', 'opera mini', 'nokia', 'htc_', 'samsung', 'motorola', 'smartphone', 'blackberry', 'playstation portable', 'tablet browser');
	$agent=strtolower($_SERVER['HTTP_USER_AGENT']);
	foreach($mobile_agent_array as $value)
		if(strpos($agent,$value)!==false)
			return true;
	return false;
}
if(isset($_GET['frontendAjax'])&&$_GET['initscript']=='credit'){
	$proid=(int) mysql_real_escape_string($_POST['proid']);
	$name_lan='name_'.$cur_lang->iso2;
	$product_query=db_query("
		SELECT 
			p.Price,
			p.product_code,
			p.slug,
			p.`$name_lan`, 
			s.thumbnail 
		FROM SC_products p,SC_product_pictures s 
		WHERE 
			p.productID=$proid 
			AND 
			s.productID=$proid 
			AND 
			s.priority=0
	");
	$product_fetch=db_fetch_row($product_query);
	$smarty->assign('price',$product_fetch['Price']);
	$smarty->assign('priceE',show_price($product_fetch['Price']));
	$smarty->assign('name',htmlentities($product_fetch["$name_lan"]));
	$smarty->assign('product_code',$product_fetch["product_code"]);
	$smarty->assign('slug',$product_fetch["slug"]);
	$smarty->assign('check_mobile_device',check_mobile_devic()?'mobile':'desktop');
	$smarty->assign('thumbnail','/published/publicdata/AUTO/attachments/SC/products_pictures/'.$product_fetch['thumbnail']);
	echo $smarty->fetch('banks.tpl.html');
	exit;
}
if(isset($_GET['frontendAjax'])&&$_GET['initscript']=='bycredit'){
	$proid=(int) mysql_real_escape_string($_POST['proid']);
	$name_lan='name_'.$cur_lang->iso2;
	$product_query=db_query("
		SELECT 
			p.eproduct_available_days,
			p.in_stock,
			p.Price,
			p.product_code,
			p.slug,
			p.`$name_lan`, 
			s.thumbnail 
		FROM SC_products p,SC_product_pictures s 
		WHERE 
			p.productID=$proid 
			AND 
			s.productID=$proid 
			AND 
			s.priority=0
	");
	$product_fetch=db_fetch_row($product_query);
	$birthday=(date('Y')-21).'-'.date('m').'-'.date('d');
	$smarty->assign('price',$product_fetch['Price']);
	$smarty->assign('priceE',show_price($product_fetch['Price']));
	$smarty->assign('name',htmlentities($product_fetch["$name_lan"]));
	$smarty->assign('product_code',$product_fetch["product_code"]);
	$smarty->assign('slug',$product_fetch["slug"]);
	$smarty->assign('check_mobile_device',check_mobile_devic()?'mobile':'desktop');
	$smarty->assign('eproduct_available_days',$product_fetch["eproduct_available_days"]);
	$smarty->assign('birthday',$birthday);
	$smarty->assign('thumbnail','/published/publicdata/AUTO/attachments/SC/products_pictures/'.$product_fetch['thumbnail']);
	echo $smarty->fetch('instpay.tpl.html');
	exit;
}
if($_GET['frontendAjax']&&$_GET['initscript']=='pbbank'){
	$proid=(int) mysql_real_escape_string($_GET['proid']);
	$name_lan='name_'.$cur_lang->iso2;
	$product_query=db_query("
		SELECT 
			p.eproduct_available_days, 
			p.in_stock, 
			p.Price, 
			p.product_code, 
			p.slug, 
			p.`$name_lan`, 
			s.thumbnail 
		FROM SC_products p,SC_product_pictures s 
		WHERE 
			p.productID=$proid 
			AND 
			s.productID=$proid 
			AND 
			s.priority=0
	");
	$last_index_query=db_query("SELECT MAX(orderId) FROM SC_credits");
	$last_index_fetch=db_fetch_row($last_index_query);
	if($last_index_fetch[0]=='')
		$last_index=0;
	else
		$last_index=$last_index_fetch[0];
	$last_index=$last_index+1;
	$product_fetch=db_fetch_row($product_query);
	$birthday=(date('Y')-21).'-'.date('m').'-'.date('d');
	$maxCount=round(100000/$product_fetch['Price']);
	if($maxCount<$product_fetch['in_stock'])
		$max_count=$maxCount-1;
	if($maxCount>=$product_fetch['in_stock'])
		$max_count=$product_fetch['in_stock'];
	$min_count=1;
	if($product_fetch['Price']<300)
		$min_count=round(300/$product_fetch['Price'])+1;
	if(isset($_POST['send'])){
		$co=mysql_real_escape_string($_POST['co']);
		$name=mysql_real_escape_string($_POST['name']);
		$telefone=mysql_real_escape_string($_POST['telefone']);
		$email=mysql_real_escape_string($_POST['email']);
		$region=mysql_real_escape_string($_POST['region']);
		$term=mysql_real_escape_string($_POST['term']);
		$message=mysql_real_escape_string($_POST['message']);
		$proid=(int) mysql_real_escape_string($_GET['proid']);
		require_once('PayParts.php');
		$product_code=$product_fetch['product_code'];
		$product_price=$product_fetch['Price'];
		$slug=$product_fetch["slug"];
		$name_lan='name_'.$cur_lang->iso2;
		$ProductsList=array(
		    array(
		        "name"	=>	htmlentities($product_fetch["$name_lan"]),
		        "count"	=>	$co,
		        "price"	=>	$product_fetch['Price']
		    )
		);
		$options=array(
			'ResponseUrl' 	=>	'https://130.com.ua/?frontendAjax=1&initscript=sender',
			'RedirectUrl' 	=>	'https://130.com.ua/product/'.$slug.'?endcredit=reddir',
			'FailRedirectUrl' => 'https://130.com.ua/product/'.$slug.'?endcredit=fail',
			'SuccessRedirectUrl' => 'https://130.com.ua/product/'.$slug.'?endcredit=success',
			'PartsCount'  	=>	$term,
			'Prefix'      	=>	'',
			'OrderID'     	=>	$last_index,
			'merchantType'	=>	'II',
			'Currency'    	=>	'',
			'ProductsList'	=>	$ProductsList,
			'recipientId' 	=>	''
		);
		$result.="\nАртикул: ".$product_code;
		$result.="\nТовар: ".$product_fetch[$name_lan];
		$result.="\nЦена: ".$product_price." грн.";
		$result.="\nФИО: ".$name;
		$result.="\nТелефон: ".$telefone;
		$result.="\nEmail: ".$email;
		$result.="\nКоличество: ".$co.' шт.';
		$result.="\nГород проживания: ".$region;
		$result.="\nСрок рассрочки: $term мес.";
		$result.="\nИсточник: ".$_SESSION['utm_fullcompany'];
		setcookie("name", $name,time()+3600*12);
		setcookie("email", $email,time()+3600*12);
		setcookie("region", $region,time()+3600*12);

		$name_lan='name_'.$cur_lang->iso2;
		$words='credit_mail_title';
		$langid=array('ru'=>1,'en'=>2,'uk'=>3);
		$lang_id=$langid[$cur_lang->iso2];
		$dbres = db_query("SELECT value FROM SC_local WHERE id='$words' AND lang_id='{$lang_id}'");
		$subject=db_fetch_row($dbres)['value'];

















$dbre=db_query("
		SELECT value 
		FROM SC_local 
		WHERE 
			(id='credit_mail_title' OR id='email_hello' OR id='prdset_product_code' OR id='str_price' OR id='order_helpfull' OR id='installments_accepted' OR id='you_ordered' OR id='payeds' OR id='payment_status' OR id='status_text' OR id='pb_email_body') AND lang_id='{$lang_id}'
	");
	$translite=db_fetch_row($dbre);
	print_r($translite);
	exit;
	$subject=$translite[0]['value'];
	$email_hello=$translite[1]['value'];
	$prdset_product_code=$translite[2]['value'];
	$str_price=$translite[3]['value'];
	$order_helpfull=$translite[4]['value'];

	$installments_accepted=$translite[5]['value'];
	$you_ordered=$translite[6]['value'];
	$payeds=$translite[7]['value'];
	$payment_status=$translite[8]['value'];
	$status_text=$translite[9]['value'];
	$pb_email_body=$translite[10]['value'];

	$smarty->assign('installments_accepted',$installments_accepted);
	$smarty->assign('you_ordered',$you_ordered);
	$smarty->assign('payeds',$payeds);
	$smarty->assign('payment_status',$payment_status);
	$smarty->assign('status_text',$status_text);
	$smarty->assign('pb_email_body',$pb_email_body);




















		$prefix1='88Qn|Q*wcIa5';
	    $prefix2='66{Rvi#wy?r?#1';
	    $prc=round($product_fetch['Price']);
	    $encode="$prefix1$prc$prefix2";
	   	$encode=urlencode(base64_encode("$encode@150@transparent@".$cur_lang->iso2."@1@1"));

	   	$smarty->assign('type','info');
		$smarty->assign('lang',$cur_lang->iso2);
		$smarty->assign('price',$product_fetch['Price']);
		$smarty->assign('priceE',"<img style='margin-bottom: -5px;' src='https://130.com.ua/published/SC/html/scripts/price.php?prc=$encode' title='$cur_lang'/>");
		$smarty->assign('thumbnail','https://130.com.ua/published/publicdata/AUTO/attachments/SC/products_pictures/'.$product_fetch['thumbnail']);
		$smarty->assign('name',htmlentities($product_fetch["$name_lan"]));
		$smarty->assign('product_code',$product_fetch["product_code"]);
		$smarty->assign('slug',$product_fetch["slug"]);

		$fio=$name;
		$smarty->assign('fio',$fio);	

		mail('order@130.com.ua','Мгновенная рассрочка (Приватбанк) для '.$name.' на сумму '.($product_price*$co).' грн.'.$message,$result,"From: <order@130.com.ua>\nContent-type: text/html; charset=UTF-8\r\n");
		$pp=new PayParts('158CC6EE85DA472AB3FB','be437266072d4b81b7878c932fe1c5bb');
		$pp->SetOptions($options);
		$send=$pp->Create();
		setcookie("signature",$send['token'],time()+3600*12,'/');
		$product_query=db_query("
			INSERT INTO 
				SC_credits 
				(product_articul, count, price, payment_state, token, period, fio, tel, email, city) 
			VALUES 
				('$product_code', '$co', '$product_price', '0', '{$send['token']}', $term, '$name', '$telefone', '$email', '$region')
		");
		if($send['token']!=''){
			if($email!=''){
				$smarty->assign('url_pay','https://payparts2.privatbank.ua/ipp/v2/payment?token='.$send['token'].'&lang='.$cur_lang->iso2);
				mail($email,$subject,$smarty->fetch('sending_email.tpl.html'),"From: <order@130.com.ua>\nContent-type: text/html; charset=UTF-8\r\n"); // Рассылка пользователю
			}

			header('Location: https://payparts2.privatbank.ua/ipp/v2/payment?token='.$send['token'].'&lang='.$cur_lang->iso2);
		}
		exit;
	}
    $prefix1='88Qn|Q*wcIa5';
    $prefix2='66{Rvi#wy?r?#1';
    $prc=round($product_fetch['Price']);
    $encode="$prefix1$prc$prefix2";
   	$encode=urlencode(base64_encode("$encode@150@transparent@".$cur_lang->iso2."@1@1"));
	$smarty->assign('price',$product_fetch['Price']);
	$smarty->assign('priceE',"<img style='margin-bottom: -5px;' src='/published/SC/html/scripts/price.php?prc=$encode' title='$cur_lang'/>");
	$smarty->assign('name',htmlentities($product_fetch["$name_lan"]));
	$smarty->assign('product_code',$product_fetch["product_code"]);
	$smarty->assign('slug',$product_fetch["slug"]);
	$smarty->assign('check_mobile_device',check_mobile_devic()?'mobile':'desktop');
	$smarty->assign('eproduct_available_days',$product_fetch["eproduct_available_days"]);
	$smarty->assign('birthday',$birthday);
	$smarty->assign('min_count',$min_count);
	$smarty->assign('max_count',$max_count);
	$smarty->assign('thumbnail','/published/publicdata/AUTO/attachments/SC/products_pictures/'.$product_fetch['thumbnail']);
	echo $smarty->fetch('pbinstpay.tpl.html');
	exit;
}
if(isset($_GET['frontendAjax'])&&$_GET['initscript']=='sender'){
	$content=file_get_contents('php://input');
	$res=json_decode($content,true);
	$orderId=explode('-',$res['orderId'])[1];
	if(isset($orderId)){

		$name_lan='name_'.$cur_lang->iso2;
		$orderId=mysql_real_escape_string($orderId);
		$message=mysql_real_escape_string($res['message']);
		$paymentState=mysql_real_escape_string($res['paymentState']);
		$signature=mysql_real_escape_string($res['signature']);
		if($paymentState=='SUCCESS'){
			db_query("
				UPDATE SC_credits 
				SET payment_state=1 
				WHERE 
					orderId='{$orderId}' 
					AND 
					token='{$signature}' 
			");
		}
		$credit_query=db_query("
			SELECT * 
			FROM SC_credits 
			WHERE 
				orderId='{$orderId}'
		");
		$credit_fetch=db_fetch_row($credit_query);
		$product_articul=$credit_fetch['product_articul'];
		$product_query=db_query("
			SELECT *
			FROM SC_products 
			WHERE 
				product_code='{$product_articul}'
		");
		$product_fetch=db_fetch_row($product_query);
		$statusesDecode=array(
			'CREATED'=>'Платеж создан',
			'CANCELED'=>'Платеж отменен (клиентом)',
			'SUCCESS'=>'Платеж успешно совершен',
			'FAIL'=>'Ошибка при создании платежа',
			'CLIENT_WAIT'=>'Ожидание оплаты клиента',
			'OTP_WAITING'=>'Подтверждения клиентом ОТП пароля',
			'PP_CREATION'=>'Cоздание контракта для платежа',
			'LOCKED'=>'Платеж подтвержден клиентом и ожидает подтверждение магазином.'
		);
		if(isset($statusesDecode[$paymentState]))
			$status=$statusesDecode[$paymentState];
		else
			$status=$paymentState;
		$result='';
		$result.="\nСтатус: ".$status;
		$result.="\nТекст договора: ".$message;
		$result.="\nИсточник: ".'PrivatBank API';
		
		$sum=$product_fetch['Price']*$credit_fetch['count'];

		$name_lan='name_'.$cur_lang->iso2;
		$words='credit_mail_title';
		$langid=array('ru'=>1,'en'=>2,'uk'=>3);
		$lang_id=$langid[$cur_lang->iso2];
		$dbres = db_query("SELECT value FROM SC_local WHERE id='$words' AND lang_id='{$lang_id}'");
		$subject=db_fetch_row($dbres)['value'];





$dbre=mysql_query("
		SELECT value 
		FROM SC_local 
		WHERE 
			(id='credit_mail_title' OR id='email_hello' OR id='prdset_product_code' OR id='str_price' OR id='order_helpfull' OR id='installments_accepted' OR id='you_ordered' OR id='payeds' OR id='payment_status' OR id='status_text' OR id='pb_email_body') AND lang_id='{$lang_id}'
	");
	$translite=mysql_fetch_all($dbre);
	$subject=$translite[0]['value'];
	$email_hello=$translite[1]['value'];
	$prdset_product_code=$translite[2]['value'];
	$str_price=$translite[3]['value'];
	$order_helpfull=$translite[4]['value'];

	$installments_accepted=$translite[5]['value'];
	$you_ordered=$translite[6]['value'];
	$payeds=$translite[7]['value'];
	$payment_status=$translite[8]['value'];
	$status_text=$translite[9]['value'];
	$pb_email_body=$translite[10]['value'];

	$smarty->assign('installments_accepted',$installments_accepted);
	$smarty->assign('you_ordered',$you_ordered);
	$smarty->assign('payeds',$payeds);
	$smarty->assign('payment_status',$payment_status);
	$smarty->assign('status_text',$status_text);
	$smarty->assign('pb_email_body',$pb_email_body);





















		$prefix1='88Qn|Q*wcIa5';
	    $prefix2='66{Rvi#wy?r?#1';
	    $prc=round($product_fetch['Price']);
	    $encode="$prefix1$prc$prefix2";
	   	$encode=urlencode(base64_encode("$encode@150@transparent@".$cur_lang->iso2."@1@1"));
		
		$smarty->assign('type','status');
		$smarty->assign('lang',$cur_lang->iso2);
		$smarty->assign('status',$status);
		$smarty->assign('text',$message);

		if($credit_fetch['email']!='')
			mail($credit_fetch['email'],$subject,$smarty->fetch('sending_email.tpl.html'),"From: <order@130.com.ua>\nContent-type: text/html; charset=UTF-8\r\n"); // Рассылка пользователю

		mail('order@130.com.ua','Мгновенная рассрочка (Приватбанк) для '.$fio.' на сумму '.$sum.' грн.',$result,"From: <order@130.com.ua>\nContent-type: text/html; charset=UTF-8\r\n");
		exit;
	}else{
		$product_code=$_GET['product_code'];
		setcookie("name", $_GET['name'],time()+3600*12);
		setcookie("email", $_GET['email'],time()+3600*12);
		setcookie("region", $_GET['region'],time()+3600*12);
		setcookie("inn", $_GET['inn'],time()+3600*12);
		setcookie("ps_s", $_GET['ps_s'],time()+3600*12);
		setcookie("ps_n", $_GET['ps_n'],time()+3600*12);
		setcookie("birth", $_GET['birth'],time()+3600*12);
		$product_query=db_query("
			SELECT 
				Price
			FROM SC_products 
			WHERE 
				product_code='{$product_code}'
		");
		$product_fetch=db_fetch_row($product_query);
		$result='';
		$result.="\nАртикул: ".$product_code;
		$result.="\nТовар: ".$_GET['product'];
		$result.="\nЦена: ".$product_fetch['Price']." грн.";
		$result.="\nФИО: ".$_GET['name'];
		$result.="\nТелефон: ".$_GET['telefone'];
		$result.="\nEmail: ".$_GET['email'];
		$result.="\nДата рождения: ".$_GET['birth'];
		$result.="\nГород проживания: ".$_GET['region'];
		$result.="\nИНН: ".$_GET['inn'];
		$result.="\nПаспорт серия: ".$_GET['ps_s'];
		$result.="\nПаспорт номер: ".$_GET['ps_n'];
		$result.="\nСрок рассрочки: ".$_GET['tarif']." мес.";
		$result.="\nИсточник: ".$_SESSION['utm_fullcompany'];
		mail('order@130.com.ua','Запрос на рассрочку от '.$_GET['name'] ,$result,"From: <order@130.com.ua>\nContent-type: text/html; charset=UTF-8\r\n");
		exit;
	}
}
?>