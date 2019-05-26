# explain
## 使用方法
1. 直接在语句后面加explain()
2. 创建一个exp对象
  exp=db.people.explain()
## explain参数
- queryPlanner
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "M201.people",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "address.state" : {
                                                "$eq" : "New York"
                                        }
                                },
                                {
                                        "job" : {
                                                "$eq" : "Counselling psychologist"
                                        }
                                },
                                {
                                        "last_name" : {
                                                "$eq" : "Johnson"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "filter" : {
                                "address.state" : {
                                        "$eq" : "New York"
                                }
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "job" : 1,
                                        "employer" : 1,
                                        "last_name" : 1,
                                        "first_name" : 1
                                },
                                "indexName" : "job em las firs",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "job" : [ ],
                                        "employer" : [ ],
                                        "last_name" : [ ],
                                        "first_name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "job" : [
                                                "[\"Counselling psychologist\", \"Counselling psychologist\"]"
                                        ],
                                        "employer" : [
                                                "[MinKey, MaxKey]"
                                        ],
                                        "last_name" : [
                                                "[\"Johnson\", \"Johnson\"]"
                                        ],
                                        "first_name" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "VM-0-6-ubuntu",
                "port" : 27017,
                "version" : "4.0.6",
                "gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"
        },
        "ok" : 1
}

```
  返回查询计划
- executionStats
  返回获胜计划查询相关信息
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "M201.people",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "address.state" : {
                                                "$eq" : "New York"
                                        }
                                },
                                {
                                        "job" : {
                                                "$eq" : "Counselling psychologist"
                                        }
                                },
                                {
                                        "last_name" : {
                                                "$eq" : "Johnson"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "filter" : {
                                "address.state" : {
                                        "$eq" : "New York"
                                }
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "job" : 1,
                                        "employer" : 1,
                                        "last_name" : 1,
                                        "first_name" : 1
                                },
                                "indexName" : "job em las firs",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "job" : [ ],
                                        "employer" : [ ],
                                        "last_name" : [ ],
                                        "first_name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "job" : [
                                                "[\"Counselling psychologist\", \"Counselling psychologist\"]"
                                        ],
                                        "employer" : [
                                                "[MinKey, MaxKey]"
                                        ],
                                        "last_name" : [
                                                "[\"Johnson\", \"Johnson\"]"
                                        ],
                                        "first_name" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 0,
                "executionTimeMillis" : 0,
                "totalKeysExamined" : 70,
                "totalDocsExamined" : 2,
                "executionStages" : {
                        "stage" : "FETCH",
                        "filter" : {
                                "address.state" : {
                                        "$eq" : "New York"
                                }
                        },
                        "nReturned" : 0,
                        "executionTimeMillisEstimate" : 0,
                        "works" : 70,
                        "advanced" : 0,
                        "needTime" : 69,
                        "needYield" : 0,
                        "saveState" : 0,
                        "restoreState" : 0,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "docsExamined" : 2,
                        "alreadyHasObj" : 0,
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "nReturned" : 2,
                                "executionTimeMillisEstimate" : 0,
                                "works" : 70,
                                "advanced" : 2,
                                "needTime" : 67,
                                "needYield" : 0,
                                "saveState" : 0,
                                "restoreState" : 0,
                                "isEOF" : 1,
                                "invalidates" : 0,
                                "keyPattern" : {
                                        "job" : 1,
                                        "employer" : 1,
                                        "last_name" : 1,
                                        "first_name" : 1
                                },
                                "indexName" : "job em las firs",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "job" : [ ],
                                        "employer" : [ ],
                                        "last_name" : [ ],
                                        "first_name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "job" : [
                                                "[\"Counselling psychologist\", \"Counselling psychologist\"]"
                                        ],
                                        "employer" : [
                                                "[MinKey, MaxKey]"
                                        ],
                                        "last_name" : [
                                                "[\"Johnson\", \"Johnson\"]"
                                        ],
                                        "first_name" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                },
                                "keysExamined" : 70,
                                "seeks" : 68,
                                "dupsTested" : 0,
                                "dupsDropped" : 0,
                                "seenInvalidated" : 0
                        }
                }
        },
        "serverInfo" : {
                "host" : "VM-0-6-ubuntu",
                "port" : 27017,
                "version" : "4.0.6",
                "gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"
        },
        "ok" : 1
}

```
- allPlansExecution
  返回所有信息
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "M201.people",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "address.state" : {
                                                "$eq" : "New York"
                                        }
                                },
                                {
                                        "job" : {
                                                "$eq" : "Counselling psychologist"
                                        }
                                },
                                {
                                        "last_name" : {
                                                "$eq" : "Johnson"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "filter" : {
                                "address.state" : {
                                        "$eq" : "New York"
                                }
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "job" : 1,
                                        "employer" : 1,
                                        "last_name" : 1,
                                        "first_name" : 1
                                },
                                "indexName" : "job em las firs",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "job" : [ ],
                                        "employer" : [ ],
                                        "last_name" : [ ],
                                        "first_name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "job" : [
                                                "[\"Counselling psychologist\", \"Counselling psychologist\"]"
                                        ],
                                        "employer" : [
                                                "[MinKey, MaxKey]"
                                        ],
                                        "last_name" : [
                                                "[\"Johnson\", \"Johnson\"]"
                                        ],
                                        "first_name" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 0,
                "executionTimeMillis" : 277,
                "totalKeysExamined" : 70,
                "totalDocsExamined" : 2,
                "executionStages" : {
                        "stage" : "FETCH",
                        "filter" : {
                                "address.state" : {
                                        "$eq" : "New York"
                                }
                        },
                        "nReturned" : 0,
                        "executionTimeMillisEstimate" : 46,
                        "works" : 70,
                        "advanced" : 0,
                        "needTime" : 69,
                        "needYield" : 0,
                        "saveState" : 1,
                        "restoreState" : 1,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "docsExamined" : 2,
                        "alreadyHasObj" : 0,
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "nReturned" : 2,
                                "executionTimeMillisEstimate" : 46,
                                "works" : 70,
                                "advanced" : 2,
                                "needTime" : 67,
                                "needYield" : 0,
                                "saveState" : 1,
                                "restoreState" : 1,
                                "isEOF" : 1,
                                "invalidates" : 0,
                                "keyPattern" : {
                                        "job" : 1,
                                        "employer" : 1,
                                        "last_name" : 1,
                                        "first_name" : 1
                                },
                                "indexName" : "job em las firs",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "job" : [ ],
                                        "employer" : [ ],
                                        "last_name" : [ ],
                                        "first_name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "job" : [
                                                "[\"Counselling psychologist\", \"Counselling psychologist\"]"
                                        ],
                                        "employer" : [
                                                "[MinKey, MaxKey]"
                                        ],
                                        "last_name" : [
                                                "[\"Johnson\", \"Johnson\"]"
                                        ],
                                        "first_name" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                },
                                "keysExamined" : 70,
                                "seeks" : 68,
                                "dupsTested" : 0,
                                "dupsDropped" : 0,
                                "seenInvalidated" : 0
                        }
                },
                "allPlansExecution" : [ ]
        },
        "serverInfo" : {
                "host" : "VM-0-6-ubuntu",
                "port" : 27017,
                "version" : "4.0.6",
                "gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"
        },
        "ok" : 1
}

```