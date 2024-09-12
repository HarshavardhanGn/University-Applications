using MyService as service from '../../srv/service';
annotate service.Department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Department_Id',
                Value : deptId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department_Name',
                Value : deptName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department_PhoneNo',
                Value : deptPhoneNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department_Email',
                Value : deptEmail,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Department Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : 'deptToStud/@UI.LineItem#Student',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Faculties',
            ID : 'Faculties',
            Target : 'deptToLec/@UI.LineItem#Faculties',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Department_Id',
            Value : deptId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department_Name',
            Value : deptName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department_PhoneNo',
            Value : deptPhoneNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department_Email',
            Value : deptEmail,
        },
    ],
);

annotate service.Student with @(
    UI.LineItem #Student : [
        {
            $Type : 'UI.DataField',
            Value : studPhoneNo,
            Label : 'Student_PhoneNo',
        },
        {
            $Type : 'UI.DataField',
            Value : studName,
            Label : 'Student_Name',
        },
        {
            $Type : 'UI.DataField',
            Value : studId,
            Label : 'Student_Id',
        },
        {
            $Type : 'UI.DataField',
            Value : studEmail,
            Label : 'Student_Email',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : '@UI.FieldGroup#Student',
        },
    ],
    UI.FieldGroup #Student : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : studPhoneNo,
                Label : 'Student_PhoneNo',
            },
            {
                $Type : 'UI.DataField',
                Value : studName,
                Label : 'Student_Name',
            },
            {
                $Type : 'UI.DataField',
                Value : studId,
                Label : 'Student_Id',
            },
            {
                $Type : 'UI.DataField',
                Value : studEmail,
                Label : 'Student_Email',
            },
        ],
    },
);

annotate service.Lecture with @(
    UI.LineItem #Faculties : [
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer_Name',
        },
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'Lecturer_Id',
        },
        {
            $Type : 'UI.DataField',
            Value : l_skills,
            Label : 'Lecturer_Skills',
        },
        {
            $Type : 'UI.DataField',
            Value : l_gender,
            Label : 'Lecturer_Gender',
        },
        {
            $Type : 'UI.DataField',
            Value : l_dob,
            Label : 'Lecturer_DOB',
        },
        {
            $Type : 'UI.DataField',
            Value : l_dept_name,
            Label : 'Lecturer_Dept_Name',
        },
        {
            $Type : 'UI.DataField',
            Value : l_age,
            Label : 'Lecturer_Age',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Faculties',
            ID : 'Faculties',
            Target : '@UI.FieldGroup#Faculties',
        },
    ],
    UI.FieldGroup #Faculties : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : lectName,
                Label : 'Lecturer_Name',
            },
            {
                $Type : 'UI.DataField',
                Value : lectId,
                Label : 'Lecturer_Id',
            },
            {
                $Type : 'UI.DataField',
                Value : l_skills,
                Label : 'Lecturer_Skills',
            },
            {
                $Type : 'UI.DataField',
                Value : l_gender,
                Label : 'Lecturer_Gender',
            },
            {
                $Type : 'UI.DataField',
                Value : l_dob,
                Label : 'Lecturer_DOB',
            },
            {
                $Type : 'UI.DataField',
                Value : l_age,
                Label : 'Lecturer_Age',
            },
            {
                $Type : 'UI.DataField',
                Value : l_dept_name,
                Label : 'Lecturer_Dept_Name',
            },
            {
                $Type : 'UI.DataField',
                Value : Status,
                Label : 'Status',
            },
        ],
    },
);

annotate service.Lecture with {
    lectId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'College',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lectId,
                    ValueListProperty : 'lectId',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectName',
                    LocalDataProperty : lectName,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'l_dob',
                    LocalDataProperty : l_dob,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'l_dept_name',
                    LocalDataProperty : l_dept_name,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'l_age',
                    LocalDataProperty : l_age,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'l_skills',
                    LocalDataProperty : l_skills,
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'Status',
                    LocalDataProperty : Status,
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};

