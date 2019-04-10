<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];


  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="SELECT")
   {
    $SQL="SELECT INV_CODI,INV_NOMB,INV_APEL FROM sgi_inve WHERE INV_CODI_USUA=" . $d["Usuario"];

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
    mysqli_close($conexion);
    echo json_encode($resultArray);                                                        
   }

   if ($Accion=="SELECTID")
   {
    $SQL="SELECT INV.INV_CODI,INV_CODI_USUA, INV.INV_IDEN,INV.INV_TIPO_DOCU_CODI,INV.INV_NOMB,INV.INV_APEL,INV.INV_LINK_CVLA,INV_TICA_CODI, " .
    " INV.INV_FECH_NACI,INV.INV_MAIL,INV.INV_CENT_CODI,INV.INV_PROG_ACAD_CODI, " .
    " INV.INV_TELE_CELU,INV.inv_foto, ZONA.ZON_NOMB ,ESCUELA.ESC_NOMB FROM sgi_inve AS INV LEFT JOIN sgi_cent AS CENTRO ON " .
    " CENTRO.CEN_CODI = INV.INV_CENT_CODI LEFT JOIN sgi_prog_acad AS PROGRAMA ON " .
    " PROGRAMA.PAC_CODI = INV.INV_PROG_ACAD_CODI LEFT JOIN sgi_zona AS ZONA ON ZONA.ZON_CODI = CENTRO.CEN_ZONA_CODI " .
    " LEFT JOIN sgi_escu AS ESCUELA ON ESCUELA.ESC_CODI = PROGRAMA.PAC_ESCU_CODI " .
    " WHERE INV.INV_CODI =" . $d["Investigador"];

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
    mysqli_close($conexion);
    echo json_encode($resultArray);                                                        
   }
?>