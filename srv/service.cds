using db from  '../db/schema';



service MyService {

    

    @odata.draft.enabled
    @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'l_dob'
        ],
        TargetProperties : [
            'l_age',
        ]
    }


    entity College as projection on db.College;
   

    entity Files as projection on db.Files;

    @odata.draft.enabled
    entity Department as projection on db.Department;
    
    entity Student as projection on db.Student;
    entity Lecture as projection on db.Lecture;
   
   
  
    


    entity Datatable as projection on db.Datatable;


    entity  Authority as projection on db.Authority;

    


  


    

}