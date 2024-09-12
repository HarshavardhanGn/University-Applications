// const cds = require('@sap/cds');
// const { notEqual, equal } = require('assert');
// const { debug } = require('console');
const cds = require('@sap/cds/libx/_runtime/cds');
const { select } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');





module.exports = async function (params) {
  

    const { Department , Datatable , Student , College ,  Lecture ,Authority, Files } = this.entities;
   var myage;
    
  
 

        this.before('UPDATE', College, fileUpload);
    this.before('CREATE', College, fileUpload);
   async function fileUpload(req){
    if(req.data.ClgToFile){
        for (const stud of req.data.ClgToFile) { 
            
                stud.url = `/Files(ID=${stud.ID},IsActiveEntity=true)/content`
            
        }
    }
}    
        
this.on('DELETE',Files, async (req) => {
    // await DELETE.from(Teacher).where ({TeacherId:req.data.TeacherId});
    debugger
    await DELETE.from(Files).where ({fileName:req.data.fileName});
       });

       this.before('CREATE', Files.drafts, async (req) =>{
        // debugger;
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/Files(ID=${req.data.ID},IsActiveEntity=true)/content`
    })

    this.before('CREATE', Department, async (req) => {

        var { deptName, deptPhoneNo,deptEmail } = req.data;
        
        deptEmail = deptEmail.trim();
        deptPhoneNo = deptPhoneNo.trim();
        deptName = deptName.trim();
        debugger

        if(deptName === null )
        {
            debugger

            req.error(400,`please fill the dept field`);
        }
        else
            {
                 debugger
                upperCaseDepname = deptName.toUpperCase();
                check_deptname = await(SELECT.from(Department).where({deptName: upperCaseDepname}));
                debugger
                if(check_deptname.length > 0){
                req.error(400,`Dept Name ${ upperCaseDepname} present`);

                return;
                }
            }
        

            

            if(deptPhoneNo.length == 10)
                {   check_deptPhoneNo1 = await(SELECT.from(Department).where({deptPhoneNo:deptPhoneNo}));
                    check_deptPhoneNo2 = await(SELECT.from(Student).where({studPhoneNo :deptPhoneNo}));
                    
                    
                    debugger
                    if(check_deptPhoneNo1.length > 0 ||  check_deptPhoneNo2.length > 0   ){
                    req.error(400,`deptPhoneNo ${deptPhoneNo} present`);
                    }
                    debugger
                }
               
             else if(deptPhoneNo === null || deptPhoneNo === undefined || deptPhoneNo === ''){
                        req.error(400, `please fill the phone number field`);
                        return;
                        debugger
                }

                else if(deptPhoneNo.length < 10)
                 { 
                    debugger
                    req.error(400,'please enter correct phone number');
                   
                    return;
                    debugger
                 }




              if(deptEmail === null || deptEmail === undefined || deptEmail === '')
                    { debugger
                        req.error(400,`please fill the email id field`);
                        return;
                    }
                    else
                    {
                    check_deptEmail1 = await(SELECT.from(Department).where({deptEmail:deptEmail}));
                    debugger
                    check_deptEmail2 = await(SELECT.from(Student).where({studEmail:deptEmail}));
                    debugger
                  
                    
                    if(check_deptEmail1.length > 0 || check_deptEmail2.length > 0){ 
                      debugger
                            req.error(400, `Email ${Email} already exist`);
                            return;
                            debugger
                        }
                      else if((!deptEmail.endsWith('@peolsolutions.com')) )
                      {
                        debugger
                        req.error(400, `Email ${deptEmail} must end with '@peolsolutions.com'.`);
                        return;
                      }
                    } 
                      
                        
                            
                      
      

        

        const lastdbRecord = await cds.run(
            SELECT.from(Datatable).orderBy({ value: 'desc' }).limit(1)
        );
        
            const { value, Depid, stdid, Teacherid } = lastdbRecord[0];

            debugger

            const lastlIdNumber = parseInt(Depid.substring(1));
            const nextlIdNumber = lastlIdNumber + 1;
            const nextTeacherId = `D${nextlIdNumber}`;

      

        
let upd = await cds.update(Datatable).set({ Depid : nextTeacherId}).where({  value: 1});
console.log(upd)

        req.data.deptId = nextTeacherId;
        req.data.deptName = upperCaseDepname;
        req.data.deptEmail = deptEmail.trim();
        req.data.deptPhoneNo = deptPhoneNo.trim();
     });

     this.before('UPDATE', Department, async (req) => {
        let flag = 0;
        debugger

        const{data} = req;

        var{ studEmail,studPhoneNo,studName } = req.data;

        
        await cds.transaction(req);
        
        if (data.deptToStud && data.deptToStud.length > 0) {


            debugger
           

            
                for (const record of data.deptToStud) {
                 debugger
                const { studId ,studPhoneNo ,  studEmail } = record;
                const extstdid = await cds.run(
                    SELECT.from(Student)
                        .where({ studId: 'S0' }));

                        debugger
    
                if (studId == 'S0'){
                    
         
                    debugger
                    const extemail1 = await cds.run(
                        SELECT.from(Student)
                            .where({  studEmail:  studEmail })
                    );

                    debugger
                    const extemail2 = await cds.run(
                        SELECT.from(Department)
                            .where({   deptEmail  :  studEmail })
                    );
                    
                    debugger
            if (studEmail === null || studEmail === undefined || studEmail === '')
                {
                    req.error(400, `Please fill email id `);
                    debugger
                }

            else if (extemail1.length > 0 || extemail2.length > 0  ) {
                req.error(400, `Email id already exist'.`);
                return;
                debugger
            }
            else if(!studEmail.endsWith('@gmail.com') || !studEmail.endsWith('@peolsolutions.com'))
                {
                    req.error(400, `Invalid email format'.`);
                return;
                }
                debugger
            
            const extphone1 = await cds.run(
                SELECT.from(Student)
                    .where({ studPhoneNo : studPhoneNo  })
            );
            debugger
            const extphone2 = await cds.run(
                SELECT.from(Department)
                    .where({  deptPhoneNo : studPhoneNo  })
            );
            debugger
            
            

            if (studPhoneNo.length == 10) {
                debugger
                if(extphone1.length > 0 || extphone2.length > 0){
                    req.error(400, `Phone ${studPhoneNo } already exists in 'student'.`);
                    return;
                    debugger
                 }
                 else if(studPhoneNo === null || studPhoneNo === undefined || studPhoneNo === ''){
                    req.error(400, `please fill the phone number field`);
                    return;
                    debugger
                   }
            }
            else if(studPhoneNo.length < 10 || studPhoneNo.length > 10){
                debugger
                req.error(400, `Invalid phone number`);
                    return;

            }
               
            
         debugger
        const lastRecord1 = await cds.run(
            SELECT.from(Datatable).orderBy({ value: 'desc' }).limit(1)
        );
        
            const { value, Depid, stdid, Teacherid } = lastRecord1[0];

            const lastStdid = lastRecord1.length > 0 ? lastRecord1[0].stdid : 'S0';
            const lastStdidNumber = parseInt(lastStdid.substring(1));
            const nextStdidNumber = lastStdidNumber + 1;
            const nextStdid = `S${nextStdidNumber}`;




            let upd = await cds.update(Datatable).set({ stdid : nextStdid}).where({  value: 1});
console.log(upd)

            if (req.data.deptToStud && Array.isArray(req.data.deptToStud) && req.data.deptToStud.length > 0) {
                
                const lastRecord2 = req.data.deptToStud[req.data.deptToStud.length - 1];
                lastRecord2.studId = nextStdid;
            
            } 
            else if (req.data.deptToStud && typeof req.data.deptToStud === 'object') {
              
                req.data.deptToStud.studId = nextStdid;}}}}
});

    
          


            this.after('UPDATE', College, async (req) => {
                // const { lectId ,  cdum, lectName ,  l_dob, l_gender ,l_dept_name,l_skills , R , S , l_age} = req.data;
               
               const m_a = await cds.run(
                SELECT.from(College)
                    .columns('l_age')
                    .where({ cdum:req.cdum })
            );
            

                if(req.S == 'Approved' && req.lectId != 'L0'){
                    debugger
                 

                    await DELETE.from(College).where ({ cdum:req.cdum });
                    const lastRecord1 = await cds.run(
                        SELECT.from(Datatable).orderBy({ value: 'desc' }).limit(1));
                    debugger
                        const { value, Depid, stdid, Teacherid } = lastRecord1[0];
                         debugger
                        const lastStdid = lastRecord1.length > 0 ? lastRecord1[0].Teacherid : 'L0';
                        const lastStdidNumber = parseInt(lastStdid.substring(1));
                        const nextStdidNumber = lastStdidNumber + 1;
                        const nextStdid = `L${nextStdidNumber}`;

                        req.lectId = nextStdid;
                        // var u = m_a[0].l_age;
                        req.l_age =  m_a[0].l_age;
                        
                        
                        
                       debugger
                        await INSERT.into(College).entries(req);
            
            
            
                        let upd = await cds.update(Datatable)
                        .set({ Teacherid: nextStdid })
                        .where({ value: 1 });
                    debugger
                        
                        }
                        
                        
                    
                });
                
                // Define the calculateAge function outside of the handler for reuse
function calculateAge(mydate) {
    var today = new Date();
    console.log("Calculating age...");

    // Convert the input date string to a Date object
    var birthDate = new Date(mydate);

    // Check if birthDate is a valid date
    if (isNaN(birthDate.getTime())) {
        throw new Error('Invalid date of birth');
    }

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}



this.on('READ', College.drafts, async (req, next) => {
    if(req.data.l_dob){
        var res = calculateAge(req.data.l_dob);
        if(res > 0){ 
        await cds.update(College.drafts).set({l_age : res}).where({cdum : req.data.cdum});
        myage = res;
        }
        else{
            req.error(400, `Invalid Date of Birth`);
            return;
        }
    }
    return next();
});

                   
                          
              
               
                 
            
        
            this.before('CREATE', College, async (req) => {
                debugger

                const { lectId ,  cdum, lectName ,  l_dob, l_gender ,l_dept_name,l_skills } = req.data;
               
                   
                  
         
                 
                const Adm_email = await cds.run(
                    SELECT.from(Authority)
                        .where({  user : 'Admin'  })
                );
 
                
                debugger
                const H_email = await cds.run(
                    SELECT.from(Department)
                        .where({  deptName : req.data.l_dept_name  })
                );
                 debugger
                 var sUrll = "College(cdum=";
                 var y = req.data.cdum;
                 var z = ",IsActiveEntity=true)/ClgToFile";
                 var sUrl = sUrll + y + z;
                 

            

                 

         debugger
        var workflowContent = ({
            
                "definitionId": "us10.7c1c182ctrial.sample1.secondProcess",
                "context": {
                    "_name": req.data.lectName,
                    "dob": req.data.l_dob,
                    "age": req.data.l_age,
                    "hod_email": H_email[0].deptEmail,
                    "admin_email": Adm_email[0].email,
                    "uuid": req.data.cdum,
                    "department_name": req.data.l_dept_name,
                    "lecturer_id": req.data.lectId,
                    "gender": req.data.l_gender,
                    "pdflink": sUrl,
                    "skills": req.data.l_skills
                }
            
    });
    myage = req.data.l_dob;
    req.data.S = 'In Process';
    var BpaDest = await cds.connect.to("BpaDest");
         var result = await BpaDest.post('/workflow/rest/v1/workflow-instances', workflowContent);



    


        
            });
        
        };