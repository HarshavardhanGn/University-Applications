namespace db;

entity Department{
    key deptId : String @readonly default 'D0';
    key ddum : UUID;
    deptName : String;
    deptPhoneNo : String;
    deptEmail : String;
    deptToLec : Composition of many Lecture on deptToLec.lectToDept = $self;
    deptToStud : Composition of many Student on deptToStud.studToDept = $self;
}

entity College{
    key cdum : UUID;
    lectId : String @readonly default 'L0';
    
    lectName : String;
    l_dob : Date;
    l_age : Int16;
    l_gender : String;
    l_dept_name : String;
    l_skills : String;
    Status : String;
    RejectedBy : String;
    S : String;
    R: String; 
    
    ClgToFile : Composition of many Files on ClgToFile.FileToClg = $self;

   
  
}

entity Lecture{
    key lectId : String @UI.Placeholder : 'Choose lectId';
    key deptId : String @readonly;
    ldum : UUID;
    lectName : String @readonly;
    l_dob : Date @readonly;
    l_age : Int16 @readonly;
    l_gender : String @readonly;
    l_dept_name : String @readonly;
    l_skills : String @readonly;
    Status : String default 'Approved';
    lectToDept : Association to one Department on lectToDept.deptId = deptId; 

}

entity Student{
    key studId : String @readonly default 'S0';
    key sdum : UUID;
    deptId : String;
    studName : String;
    studPhoneNo : String;
    studEmail : String;
    studToDept : Association to one Department on studToDept.deptId = deptId;

}

entity Datatable{
      key value : Int16;
     Depid : String;
    stdid : String;
    Teacherid : String;
}
entity Authority{
    user : String;
    key email: String;
    gender : String;
}

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    key ID : UUID;
    lectId : String;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    cdum : String;
    FileToClg : Association to one College on FileToClg.cdum = cdum;
}
