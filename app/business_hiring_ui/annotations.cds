using MyService as service from '../../srv/service';
annotate service.College with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Id',
                Value : lectId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Name',
                Value : lectName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer DOB',
                Value : l_dob,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Age',
                Value : l_age,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Gender',
                Value : l_gender,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Dept_Name',
                Value : l_dept_name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Skills',
                Value : l_skills,
            },
            {
                $Type : 'UI.DataField',
                Value : S,
                Label : 'Status',
            },
            {
                $Type : 'UI.DataField',
                Value : R,
                Label : 'Rejected By',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Faculties Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Lecturer ID',
            Value : lectId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecturer Name',
            Value : lectName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecturer DOB',
            Value : l_dob,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecturer Age',
            Value : l_age,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecturer Gender',
            Value : l_gender,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : S,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Approved Data',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
        },
        {
            $Type : 'UI.DataField',
            Value : R,
            Label : 'Rejected By',
        },
        {
            $Type : 'UI.DataField',
            Value : S,
            Label : 'Status',
        },
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : S,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected Data',
    },
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
        },
        {
            $Type : 'UI.DataField',
            Value : l_skills,
            Label : 'Lecturer Skills',
        },
        {
            $Type : 'UI.DataField',
            Value : l_dept_name,
            Label : 'Lecturer Department Name',
        },
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : S,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'In Process',
                        },
                    ],
                },
            ],
        },
        Text : 'In process',
    },
    UI.HeaderInfo : {
        TypeName : 'WELCOME TO UNIVERSITY HIRING',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : l_dept_name,
        },
    },
);

annotate service.College with {
    l_dept_name @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Department',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : l_dept_name,
                    ValueListProperty : 'deptName',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate service.College with {
    l_age @Common.FieldControl : #ReadOnly
};

annotate service.College with {
    l_gender @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Authority',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : l_gender,
                    ValueListProperty : 'gender',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate service.College with {
    lectName @Common.FieldControl : #Mandatory
};

annotate service.College with {
    Status @Common.FieldControl : #ReadOnly
};

annotate service.College with {
    RejectedBy @Common.FieldControl : #ReadOnly
};

annotate service.College with {
    R @Common.FieldControl : #ReadOnly
};

annotate service.College with {
    S @Common.FieldControl : #ReadOnly
};

