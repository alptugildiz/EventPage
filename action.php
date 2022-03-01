<?php 
   $conn = new mysqli("localhost", "root", "", "testingdb");
 
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   }
    
   $out = array('error' => false);
   $action="show";
    
   if(isset($_GET['action'])){
       $action=$_GET['action'];
   }
    
   if($action=='show'){
       $sql = "select * from members";
       $query = $conn->query($sql);
       $members = array();
    
       while($row = $query->fetch_array()){
           array_push($members, $row);
       }
    
       $out['members'] = $members;
   }
    
   if($action=='add'){
    $name=$_POST['name'];
    $lastName=$_POST['lastName'];
    $email=$_POST['email'];
    $phone=$_POST['phone'];
 
    if($name==''){
        $out['error']=true;
        $out['message']='Add Member Failed. Name Empty.';
    }
    elseif($lastName==''){
        $out['error']=true;
        $out['message']='Add Member Failed. Lastname Empty.';
    }
    elseif($email==''){
        $out['error']=true;
        $out['message']='Add Member Failed. email Empty.';
    }
    elseif($phone==''){
        $out['error']=true;
        $out['message']='Add Member Failed. phone Empty.';
    }
    else{
        $sql="insert into members ( name, lastName,email,phone) values ('$name', '$lastName','$email','$phone')";
        $query=$conn->query($sql);
 
        if($query){
            $out['message']='Member Successfully Added';
        }
        else{
            $out['error']=true;
            $out['message']='Error in Adding Occured';
        }
         
    }
}
 
   $conn->close();
    
   header("Content-type: application/json");
   echo json_encode($out);
   die();
?>