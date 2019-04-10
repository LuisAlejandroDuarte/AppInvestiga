<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="INSERT")
   {
    $SQL="INSERT INTO sgi_proy  (PRO_NOMB,PRO_FINA) " .
    " VALUES (" . $d['Nombre'] . "," .  $d['Financiacion'] . ")";



    $resultArray = array(); 
  	$resultado = mysqli_query($conexion,$SQL);
    if (mysqli_num_rows($resultado)==0 )                        
        $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
    else
    {
     while ($tuple= mysqli_fetch_assoc($resultado)) {                        
           $resultArray[] = $tuple;         
        }               
    }

    $SQL="SELECT MAX(PRO_CODI) from sgi_proy";

    $resultado = mysqli_query($conexion,$SQL);
    $resultArray[]= mysqli_fetch_assoc($resultado);     
    
    
    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   }
?>