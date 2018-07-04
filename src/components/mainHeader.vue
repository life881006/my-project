<template>
	<div id="" class="headerNav">
			
		<el-col :xs="16" :sm="16" :md="16" :lg="16">
			汇学云镇江市中山路小学平台
		</el-col>
		<el-col class="pull-right" :xs="8" :sm="8" :md="8" :lg="8">
			<el-tooltip class="notice" @click="" content="系统通知"><i class="el-icon-erp-notice el-icon-big"></i></el-tooltip>
			<el-dropdown class="functionalIcon" trigger="click">
				<el-tooltip class="el-dropdown-link" effect="dark" content="修改基本信息" placement="right">
					<i class="el-icon-setting el-icon-big"></i>
				</el-tooltip>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><a @click="modifyUserInfo()"><i class="el-icon-edit"></i>修改信息</a></el-dropdown-item>
					<el-dropdown-item><a @click="unitChange()"><i class="el-icon-edit"></i>单位设置</a></el-dropdown-item>
					<el-dropdown-item><a @click="gotoBindSchoolClassSubject()"><i class="el-icon-edit"></i>我的任课</a></el-dropdown-item>
					<el-dropdown-item><a @click="gotoModifyPwd()"><i class="el-icon-edit"></i>修改信息</a></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown class="functionalIcon" trigger="click">
				<el-tooltip class="el-dropdown-link" effect="dark" content="切换模块" placement="right">
					<i class="el-icon-menu el-icon-big"></i>
				</el-tooltip>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="item in mainUser.functionalModules">
						<a @click="gotoOtherModule(item.id,item.name)">
							<i class="el-icon-edit"></i>{{item.name}}
						</a>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-tooltip class="functionalIcon" @click="" content="下载文档"><i class="el-icon-erp-docDownload el-icon-big"></i></el-tooltip>
			<el-tooltip class="functionalIcon" @click="" content="退出"><i class="el-icon-erp-exit3 el-icon-big"></i></el-tooltip>
		</el-col>
		
	</div>
</template>

<script>
	
	const login_access_token = "ccccc";
	const user = {
    "unitName": "镇江市宝塔路小学",
    "roleId": 1,
    "userFunctionalRoles": [
        {
            "name": "行政",
            "id": "1925e50226cf49e39934721016ec1b57"
        },
        {
            "name": "系统管理员",
            "id": "e5f4a3d1ef504756a592771188202b0b"
        },
        {
            "name": "教师",
            "id": "b7479f7280994e80b08fda2fe3b2d299"
        }
    ],
    "isClassHeader": true,
    "isAdmin": true,
    "grades": [
        {
            "serialNumber": 4,
            "schoolClasses": [
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2017级(01)班",
                    "id": "18a5e1a1396d4fcd8aa6a110d24f6daa"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2017级(02)班",
                    "id": "050488a1176c448b9bbb58e872129aa2"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2017级(03)班",
                    "id": "7a44253deb554024984794daf6f86721"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 1,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2017级(04)班",
                    "id": "317ee196126e4ed5816663f161fb6070"
                }
            ],
            "name": "一年级",
            "id": 4
        },
        {
            "serialNumber": 5,
            "schoolClasses": [
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2016级(01)班",
                    "id": "194c198193674b43b0c5006289288a81"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2016级(02)班",
                    "id": "8185ebe9f6984f5aba4b910ca838453c"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2016级(03)班",
                    "id": "f0b4f03ab32b49e898dbc307fccee5c2"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2016级(04)班",
                    "id": "34727b4a6bc442f0b66dacf98bb22355"
                }
            ],
            "name": "二年级",
            "id": 5
        },
        {
            "serialNumber": 6,
            "schoolClasses": [
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2015级(01)班",
                    "id": "96cc485f02984922a4d09d513cb89159"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2015级(02)班",
                    "id": "599f40531fb144a09b0862e70c7825ea"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2015级(03)班",
                    "id": "5db53289e87a4a7ab996df7353df9899"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2015级(04)班",
                    "id": "6ecb6ad24f8347a09dafc5513fe4828d"
                }
            ],
            "name": "三年级",
            "id": 6
        },
        {
            "serialNumber": 7,
            "schoolClasses": [
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2014级(01)班",
                    "id": "9560dcdd8bef4df2974434027f1ec30b"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2014级(02)班",
                    "id": "08637037699b4ea6bc9c2eb45ea73150"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2014级(03)班",
                    "id": "2450dc0d98da45dba1015d0a541f353b"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2014级(04)班",
                    "id": "f63175837e0f44b19d5adf37221382ac"
                }
            ],
            "name": "四年级",
            "id": 7
        },
        {
            "serialNumber": 8,
            "schoolClasses": [
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2013级(01)班",
                    "id": "442447bb148f40649d9a88e722e98107"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2013级(02)班",
                    "id": "1f356a0f74d74643b4b5089f2047954f"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2013级(03)班",
                    "id": "5cde6186004a4085af05933b08d057d4"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2013级(04)班",
                    "id": "c1a950be726647d9bd225ae8728efe3f"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2013级(05)班",
                    "id": "bc425214b72c418f83525776aff7e9be"
                }
            ],
            "name": "五年级",
            "id": 8
        },
        {
            "serialNumber": 9,
            "schoolClasses": [
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2012级(01)班",
                    "id": "4c16e17f95e24d7580b733e139392796"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2012级(02)班",
                    "id": "956a4d25ca9c435988c34dae43591ec4"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2012级(03)班",
                    "id": "bfccacea27984a638303cdc6d4159bbd"
                },
                {
                    "subjects": [
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "语文",
                            "id": 1
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "数学",
                            "id": 2
                        },
                        {
                            "isHomework": 1,
                            "isReport": 0,
                            "name": "英语",
                            "id": 3
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "信息",
                            "id": 11
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "劳技",
                            "id": 12
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "科学",
                            "id": 13
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "美术",
                            "id": 21
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "音乐",
                            "id": 22
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "体育与健康",
                            "id": 28
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综一",
                            "id": 29
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "综二",
                            "id": 30
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "道德与法治",
                            "id": 39
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "书法",
                            "id": 41
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "心理/社团",
                            "id": 60
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "自习",
                            "id": 66
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "课外",
                            "id": 76
                        },
                        {
                            "isHomework": 0,
                            "isReport": 0,
                            "name": "班队",
                            "id": 77
                        }
                    ],
                    "schoolClassName": "2012级(04)班",
                    "id": "477767cbe9864e88a0573eb07e0db22a"
                }
            ],
            "name": "六年级",
            "id": 9
        }
    ],
    "classHeadGrades": [
        {
            "serialNumber": 4,
            "schoolClasses": [
                {
                    "schoolClassName": "2017级(01)班",
                    "id": "18a5e1a1396d4fcd8aa6a110d24f6daa"
                },
                {
                    "schoolClassName": "2017级(02)班",
                    "id": "050488a1176c448b9bbb58e872129aa2"
                },
                {
                    "schoolClassName": "2017级(03)班",
                    "id": "7a44253deb554024984794daf6f86721"
                },
                {
                    "schoolClassName": "2017级(04)班",
                    "id": "317ee196126e4ed5816663f161fb6070"
                }
            ],
            "name": "一年级",
            "id": 4
        },
        {
            "serialNumber": 5,
            "schoolClasses": [
                {
                    "schoolClassName": "2016级(01)班",
                    "id": "194c198193674b43b0c5006289288a81"
                },
                {
                    "schoolClassName": "2016级(02)班",
                    "id": "8185ebe9f6984f5aba4b910ca838453c"
                },
                {
                    "schoolClassName": "2016级(03)班",
                    "id": "f0b4f03ab32b49e898dbc307fccee5c2"
                },
                {
                    "schoolClassName": "2016级(04)班",
                    "id": "34727b4a6bc442f0b66dacf98bb22355"
                }
            ],
            "name": "二年级",
            "id": 5
        },
        {
            "serialNumber": 6,
            "schoolClasses": [
                {
                    "schoolClassName": "2015级(01)班",
                    "id": "96cc485f02984922a4d09d513cb89159"
                },
                {
                    "schoolClassName": "2015级(02)班",
                    "id": "599f40531fb144a09b0862e70c7825ea"
                },
                {
                    "schoolClassName": "2015级(03)班",
                    "id": "5db53289e87a4a7ab996df7353df9899"
                },
                {
                    "schoolClassName": "2015级(04)班",
                    "id": "6ecb6ad24f8347a09dafc5513fe4828d"
                }
            ],
            "name": "三年级",
            "id": 6
        },
        {
            "serialNumber": 7,
            "schoolClasses": [
                {
                    "schoolClassName": "2014级(01)班",
                    "id": "9560dcdd8bef4df2974434027f1ec30b"
                },
                {
                    "schoolClassName": "2014级(02)班",
                    "id": "08637037699b4ea6bc9c2eb45ea73150"
                },
                {
                    "schoolClassName": "2014级(03)班",
                    "id": "2450dc0d98da45dba1015d0a541f353b"
                },
                {
                    "schoolClassName": "2014级(04)班",
                    "id": "f63175837e0f44b19d5adf37221382ac"
                }
            ],
            "name": "四年级",
            "id": 7
        },
        {
            "serialNumber": 8,
            "schoolClasses": [
                {
                    "schoolClassName": "2013级(01)班",
                    "id": "442447bb148f40649d9a88e722e98107"
                },
                {
                    "schoolClassName": "2013级(02)班",
                    "id": "1f356a0f74d74643b4b5089f2047954f"
                },
                {
                    "schoolClassName": "2013级(03)班",
                    "id": "5cde6186004a4085af05933b08d057d4"
                },
                {
                    "schoolClassName": "2013级(04)班",
                    "id": "c1a950be726647d9bd225ae8728efe3f"
                },
                {
                    "schoolClassName": "2013级(05)班",
                    "id": "bc425214b72c418f83525776aff7e9be"
                }
            ],
            "name": "五年级",
            "id": 8
        },
        {
            "serialNumber": 9,
            "schoolClasses": [
                {
                    "schoolClassName": "2012级(01)班",
                    "id": "4c16e17f95e24d7580b733e139392796"
                },
                {
                    "schoolClassName": "2012级(02)班",
                    "id": "956a4d25ca9c435988c34dae43591ec4"
                },
                {
                    "schoolClassName": "2012级(03)班",
                    "id": "bfccacea27984a638303cdc6d4159bbd"
                },
                {
                    "schoolClassName": "2012级(04)班",
                    "id": "477767cbe9864e88a0573eb07e0db22a"
                }
            ],
            "name": "六年级",
            "id": 9
        }
    ],
    "functionalModules": [
        {
            "pcOpenUrl": "",
            "serialNumber": 1,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "频道管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/pdgl.png",
                    "moduleName": "信息发布",
                    "pid": "0",
                    "del": 0,
                    "id": "3ae4b46b2325494f8ea3ec51534d2a25",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "内容管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/nrgl.png",
                    "moduleName": "信息发布",
                    "pid": "0",
                    "del": 0,
                    "id": "6aae26887a984e45b925f90796dc0586",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "微信群发",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/wxqf.png",
                    "moduleName": "信息发布",
                    "pid": "0",
                    "del": 0,
                    "id": "11c28791ec504967a4867583849114ec",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "文章采集",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/wzcj.png",
                    "moduleName": "信息发布",
                    "pid": "0",
                    "del": 0,
                    "id": "ddb31719d65a423baceaeeea23aaf1ee",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "微信群发列表",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "11c28791ec504967a4867583849114ec",
                    "del": 1,
                    "id": "4ec6cc2e9c3549efb63bb6c34eb81d0c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "微信公众号管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "11c28791ec504967a4867583849114ec",
                    "del": 1,
                    "id": "b6db4fb8e35b4def904b4fc1bdc8a81c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "微信菜单管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "11c28791ec504967a4867583849114ec",
                    "del": 1,
                    "id": "cc3b922b40584a90acb999f4aa720c1d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "新闻频道",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "3ae4b46b2325494f8ea3ec51534d2a25",
                    "del": 1,
                    "id": "31e5469cd82a41f384b38cd0c8bad128",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "文章管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "6aae26887a984e45b925f90796dc0586",
                    "del": 1,
                    "id": "7b049013aece4b52949fbe130159328a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "图片新闻",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "6aae26887a984e45b925f90796dc0586",
                    "del": 1,
                    "id": "60d2117a348946bba4ba002d6c74dfb5",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "通知管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "6aae26887a984e45b925f90796dc0586",
                    "del": 1,
                    "id": "b204a33e88cc49429063df9ddafb7506",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "微新闻栏目管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "6aae26887a984e45b925f90796dc0586",
                    "del": 1,
                    "id": "570eb2e7bc7c46b8ac603b9ac9674410",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "微新闻",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "6aae26887a984e45b925f90796dc0586",
                    "del": 1,
                    "id": "4a4a9acdc4c8438389fde6031b2d2fc6",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "采集规则设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "信息发布",
                    "pid": "ddb31719d65a423baceaeeea23aaf1ee",
                    "del": 1,
                    "id": "2120ad560608445c90a1bff29f11dc55",
                    "addition": 1
                }
            ],
            "name": "信息发布",
            "pcIcon": "../../layout/images/home_green_1.png",
            "id": "26cfdd0ae80e4e33ae86ad137c506375"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 2,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校通知",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/xxtz.png",
                    "moduleName": "家校互动",
                    "pid": "0",
                    "del": 0,
                    "id": "d2f9d46967c6404ebeacfac89d7c9090",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校问答",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/xxwd.png",
                    "moduleName": "家校互动",
                    "pid": "0",
                    "del": 0,
                    "id": "5b0e1ac558d548c7afb8f830fc057e8b",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级动态",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/bjdt.png",
                    "moduleName": "家校互动",
                    "pid": "0",
                    "del": 0,
                    "id": "9fbc386b99714aec92fbfac1d9cc930f",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "考勤管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/kqgl.png",
                    "moduleName": "家校互动",
                    "pid": "0",
                    "del": 0,
                    "id": "c48976ea085a46d49eff5c76c4631e31",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "作业公示",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/zygs.png",
                    "moduleName": "家校互动",
                    "pid": "0",
                    "del": 0,
                    "id": "df662a9c864e4432b3d1557451a2c421",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师答疑",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "5b0e1ac558d548c7afb8f830fc057e8b",
                    "del": 1,
                    "id": "94f440d4a7a648f98c07c72492f10f5e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "我的收藏",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "5b0e1ac558d548c7afb8f830fc057e8b",
                    "del": 1,
                    "id": "fc6a91593b7341579b454278cc381575",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级动态管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "9fbc386b99714aec92fbfac1d9cc930f",
                    "del": 1,
                    "id": "5631e3ccf4e6443ba3b06ea0568e1acc",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "到班考勤",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "c48976ea085a46d49eff5c76c4631e31",
                    "del": 1,
                    "id": "9ec3fa3c00804288992ad1a1f64e114e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "放学考勤",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "c48976ea085a46d49eff5c76c4631e31",
                    "del": 1,
                    "id": "a53c1631f2734488a38e9dd8470b44aa",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校通知管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "d2f9d46967c6404ebeacfac89d7c9090",
                    "del": 1,
                    "id": "a9e5524e083b420fb912643b565f1000",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "作业发布",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "家校互动",
                    "pid": "df662a9c864e4432b3d1557451a2c421",
                    "del": 1,
                    "id": "43a8b8a802f340abb987e039d4985c05",
                    "addition": 1
                }
            ],
            "name": "家校互动",
            "pcIcon": "../../layout/images/home_green_2.png",
            "id": "e2d42ecde418483991654e8c380db0de"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 3,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "区域教案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/qyja.png",
                    "moduleName": "网络研修",
                    "pid": "0",
                    "del": 0,
                    "id": "f687194f6b134c5b9c583436e62bc37e",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教学案管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/jxagl.png",
                    "moduleName": "网络研修",
                    "pid": "0",
                    "del": 0,
                    "id": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评课管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/pkgl.png",
                    "moduleName": "网络研修",
                    "pid": "0",
                    "del": 0,
                    "id": "8151aeb80e584fe0b62f0538c7af2443",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "我的教学案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "del": 1,
                    "id": "653e47fa38f44310ac1c4ad082b7daa4",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "初稿教学案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "del": 1,
                    "id": "421188b8db16457f97efd1c83e8a467e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "二稿教学案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "del": 1,
                    "id": "b2e4b7a4ee16410295422f1b1737a69a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "打印稿教学案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "del": 1,
                    "id": "0c6d7da07fe249278a26619177581eef",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教学案管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "del": 1,
                    "id": "c986bf24fdd346febf12fe7d57362a6c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教学案附件分类",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "4b66b3faa1294b4789ba9d958f7a4feb",
                    "del": 1,
                    "id": "fa5f0d6dd3f6407bbcbc5d60701ec77a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "我的评课",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "8151aeb80e584fe0b62f0538c7af2443",
                    "del": 1,
                    "id": "0f76e251003c41589f5ee62ab4d58144",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待审核评课",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "8151aeb80e584fe0b62f0538c7af2443",
                    "del": 1,
                    "id": "e35c20a28f7f4e50adf2b40bea8fbcee",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "发布评课",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "8151aeb80e584fe0b62f0538c7af2443",
                    "del": 1,
                    "id": "f36dac957f0640fc9044f74881460d03",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评课管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "8151aeb80e584fe0b62f0538c7af2443",
                    "del": 1,
                    "id": "582a2722c838415da808ad5084aeeed2",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待审核教案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "f687194f6b134c5b9c583436e62bc37e",
                    "del": 1,
                    "id": "caa9ba815e4142b78bb3df65f43f61c0",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待终审教案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "f687194f6b134c5b9c583436e62bc37e",
                    "del": 1,
                    "id": "e500a58b5d59403a91cf0404d8991c6a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "终审通过教案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "f687194f6b134c5b9c583436e62bc37e",
                    "del": 1,
                    "id": "998a4bbc6a2545e8b3906e4bd872aadc",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教案管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "f687194f6b134c5b9c583436e62bc37e",
                    "del": 1,
                    "id": "42c3c0c88f9f4b6fa561c96869eae1b0",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "知识点管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "网络研修",
                    "pid": "f687194f6b134c5b9c583436e62bc37e",
                    "del": 1,
                    "id": "102681c2ae354b84a8d03adff7eaddbc",
                    "addition": 1
                }
            ],
            "name": "网络研修",
            "pcIcon": "../../layout/images/home_green_3.png",
            "id": "934ec035b65a4ef8b928edba7b7d2d4b"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 4,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "课表管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/kbgl.png",
                    "moduleName": "教务管理",
                    "pid": "0",
                    "del": 0,
                    "id": "9198c49564e7429e88396f3a0c235e87",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "课务分工",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "fb2afebdbb0a48a3b4805f4a1f814ad0",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "调课系统",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "6fd470cd4c6c4cd3971d2fc7364aa974",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "代课系统",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "9293a48c953345dfaa93b772375b459f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "课程表",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "ea2816b994004c7392df33ae5fe535fd",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "排课系统",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "78687eaf666547708f6a6976abc84c26",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "实时课表管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "ba6307e116764599ad5c5110e530e5fa",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "调课申请",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "7ad80860bf32489ab31d27165e2e214f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "代课申请",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "教务管理",
                    "pid": "9198c49564e7429e88396f3a0c235e87",
                    "del": 1,
                    "id": "b3faa0df49c54ec7b19903b796248397",
                    "addition": 1
                }
            ],
            "name": "教务管理",
            "pcIcon": "../../layout/images/home_green_4.png",
            "id": "e9d2637c594b4e98ab2c238bf570633b"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 5,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "部门工作",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/bmgz.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "66a2f582722b407a8ae46c2fca3cd9a3",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "日常管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/rcgl.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "3e022049ec9546b98dc35ca9f063fdb2",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "文件流转",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/wjlz.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "f4a475bfd3ee40e1add661e37794d475",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "文章荐读",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/wzjd.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "f19d7e6641394741afab790818e3a259",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师考勤",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/jskq.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "8d1efc93137d491bb8d1073ea7caa1d8",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "会议管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/hygl.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "c729d4abb10f48578694269f7f0143b2",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "设备报修",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/sbbx.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "9b9aa41ac93843a4af9582fb203fed8b",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "访客管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/fkgl.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "dcb9de667cbf45c1b4c58f4e70b24076",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "安全巡查",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/aqxc.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "72c1c7815bc241cb95c24158688ebf90",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师发展",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/teacherHonor.png",
                    "moduleName": "校园办公",
                    "pid": "0",
                    "del": 0,
                    "id": "eac49f87395f4aa38a89e35490d4bcfa",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "栏目设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "3e022049ec9546b98dc35ca9f063fdb2",
                    "del": 1,
                    "id": "dc833df08f804ede987d6d0489705db9",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校日常管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "3e022049ec9546b98dc35ca9f063fdb2",
                    "del": 1,
                    "id": "414c94618b82402292ef816bf50483af",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "部门工作填写",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "66a2f582722b407a8ae46c2fca3cd9a3",
                    "del": 1,
                    "id": "07b149d7101a47028f0afa8b3dced80f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "部门工作管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "66a2f582722b407a8ae46c2fca3cd9a3",
                    "del": 1,
                    "id": "05eca9c71f4e4064b0cdaf8ae1e355cf",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "安全巡查设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "72c1c7815bc241cb95c24158688ebf90",
                    "del": 1,
                    "id": "97e87494c70146dc97362b62e14254a5",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "安全巡查管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "72c1c7815bc241cb95c24158688ebf90",
                    "del": 1,
                    "id": "34cde56387d14306995b99108a95129c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "考勤设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "8d1efc93137d491bb8d1073ea7caa1d8",
                    "del": 1,
                    "id": "5c87672ff3224603859fa670f13ad99c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "考勤统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "8d1efc93137d491bb8d1073ea7caa1d8",
                    "del": 1,
                    "id": "36680f6c727b4b5b93b7839fff7bf5cd",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "报修分类",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "9b9aa41ac93843a4af9582fb203fed8b",
                    "del": 1,
                    "id": "1f9734311eab41548b19821a124577ff",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待处理报修",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "9b9aa41ac93843a4af9582fb203fed8b",
                    "del": 1,
                    "id": "4a1f659a8ab949beb577815146e706fa",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "已完成报修",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "9b9aa41ac93843a4af9582fb203fed8b",
                    "del": 1,
                    "id": "0ef31588b8054eaeba89f2d202231672",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "维修统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "9b9aa41ac93843a4af9582fb203fed8b",
                    "del": 1,
                    "id": "d2506b010c8e455badedad72114f242d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "会议管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "c729d4abb10f48578694269f7f0143b2",
                    "del": 1,
                    "id": "508d7d11092b48beb628cf190aadb54e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "会议签到",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "c729d4abb10f48578694269f7f0143b2",
                    "del": 1,
                    "id": "bfd287db53d548dd868dd777939bce4d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "访客预约",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "dcb9de667cbf45c1b4c58f4e70b24076",
                    "del": 1,
                    "id": "0456f16865134ed2a8942cbf4d99bea3",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "访客登记",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "dcb9de667cbf45c1b4c58f4e70b24076",
                    "del": 1,
                    "id": "6418bd24a4c74bcba08746db9a24e278",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "访客管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "dcb9de667cbf45c1b4c58f4e70b24076",
                    "del": 1,
                    "id": "354f776c748e41bca58e4e10d4e27113",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荣誉分类",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "eac49f87395f4aa38a89e35490d4bcfa",
                    "del": 1,
                    "id": "be2d192d6f7d4fbd9855a7120e357cd3",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师荣誉管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "eac49f87395f4aa38a89e35490d4bcfa",
                    "del": 1,
                    "id": "8fa494e2184f4a408aeec114c58356c6",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荣誉统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "eac49f87395f4aa38a89e35490d4bcfa",
                    "del": 1,
                    "id": "90988c509d8d4d039a4fef97d2fa70d9",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "我的荣誉",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "eac49f87395f4aa38a89e35490d4bcfa",
                    "del": 1,
                    "id": "d6c8a03c097c42078ba7e6661c83a8b5",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "打印教师发展档案",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "eac49f87395f4aa38a89e35490d4bcfa",
                    "del": 1,
                    "id": "c5a8f0d05b3c47a4bbb8eee101a53981",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荐读分类设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f19d7e6641394741afab790818e3a259",
                    "del": 1,
                    "id": "958e3d35f15b409faf5184be77a704b8",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荐读文章管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f19d7e6641394741afab790818e3a259",
                    "del": 1,
                    "id": "2e0b08cad60e4444a5c6eafeee781431",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "发布荐读",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f19d7e6641394741afab790818e3a259",
                    "del": 1,
                    "id": "3b32b7976693464ab982f06878aede7f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "我的荐读",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f19d7e6641394741afab790818e3a259",
                    "del": 1,
                    "id": "1ea467b208f24c9b94ddae72d9df58bf",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "我的文件",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f4a475bfd3ee40e1add661e37794d475",
                    "del": 1,
                    "id": "60d49fa5652a4126ab229042dd4a9dbb",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待我批阅",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f4a475bfd3ee40e1add661e37794d475",
                    "del": 1,
                    "id": "94bc2341225945c799a30aafe6b3e42b",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "历史批阅",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f4a475bfd3ee40e1add661e37794d475",
                    "del": 1,
                    "id": "a6ef31c7560e4fa18d397f90a04b34a0",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "文件管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "校园办公",
                    "pid": "f4a475bfd3ee40e1add661e37794d475",
                    "del": 1,
                    "id": "576c7c2504f44682805a35e0bca895b9",
                    "addition": 1
                }
            ],
            "name": "校园办公",
            "pcIcon": "../../layout/images/home_green_5.png",
            "id": "27bcf54f13124e7f889e11595dc9e7ff"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 6,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级评比",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/bjpb.png",
                    "moduleName": "班级管理",
                    "pid": "0",
                    "del": 0,
                    "id": "d27b77afedfc46a581f71960d92f1a5a",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级资产",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/bjzc.png",
                    "moduleName": "班级管理",
                    "pid": "0",
                    "del": 0,
                    "id": "7ae0d0620def43018838112ede009a73",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级资产管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "7ae0d0620def43018838112ede009a73",
                    "del": 1,
                    "id": "53a0f96b42b44c97b70c6e44b30357d4",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级资产查询",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "7ae0d0620def43018838112ede009a73",
                    "del": 1,
                    "id": "e04dacda8ba94a69ba84b9c1863f997a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级资产统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "7ae0d0620def43018838112ede009a73",
                    "del": 1,
                    "id": "7f327825381349e1b68b04dd20e55a7a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级资产打印",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "7ae0d0620def43018838112ede009a73",
                    "del": 1,
                    "id": "a1a7ccf5fc04488985e632bf596f2735",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评比项目设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "d27b77afedfc46a581f71960d92f1a5a",
                    "del": 1,
                    "id": "e14b92952f73425ba6188deda850de55",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "年级评比项目",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "d27b77afedfc46a581f71960d92f1a5a",
                    "del": 1,
                    "id": "baf651e289b1491fb1184f7ff87ea632",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评比数据管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "d27b77afedfc46a581f71960d92f1a5a",
                    "del": 1,
                    "id": "679c02cbb1524546ad8405a8621180da",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评比数据统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "d27b77afedfc46a581f71960d92f1a5a",
                    "del": 1,
                    "id": "62f97ae2aa0a499aa2578a706b92a78a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级荣誉设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "d27b77afedfc46a581f71960d92f1a5a",
                    "del": 1,
                    "id": "78811db3b4e6436cb0a22eaa71f05377",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级荣誉记载",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "班级管理",
                    "pid": "d27b77afedfc46a581f71960d92f1a5a",
                    "del": 1,
                    "id": "7ef869df3efc4791b0e7560ed191090a",
                    "addition": 1
                }
            ],
            "name": "班级管理",
            "pcIcon": "../../layout/images/home_green_6.png",
            "id": "c235e13884f8475b885360b764dc2b5d"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 7,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "新生报名",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/xsbm.png",
                    "moduleName": "学籍管理",
                    "pid": "0",
                    "del": 0,
                    "id": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学籍管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/xjgl.png",
                    "moduleName": "学籍管理",
                    "pid": "0",
                    "del": 0,
                    "id": "8902e104649d430fa9ed5f96279470da",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "户籍性质",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "e15c42837d2240219458fd152084594b",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "入学类别",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "f6063f00cf284cba9d8b92cc85e38fd2",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待审核新生",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "759b0e8aa295482e80fd6a505d152078",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "初审通过新生",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "07cfa1e7f1404c32920bc2435b101237",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "待终审新生",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "4b0817586198407491de4cda01565bbc",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "终审通过新生",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "0e14b29eef3b4282a9a45c1e0828d0f2",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "报名日志",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "dd8b21b7b30a403ebd5b1a08f3d01c8c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "报名短消息",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "3ad1505cf2bd41e89c9e92d3f786b998",
                    "del": 1,
                    "id": "de3488acad6c4ba8946c149ed7d21d0a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学生管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "学籍管理",
                    "pid": "8902e104649d430fa9ed5f96279470da",
                    "del": 1,
                    "id": "eb2157ba0c4d4d7bb8ec52b5ce04f473",
                    "addition": 1
                }
            ],
            "name": "学籍管理",
            "pcIcon": "../../layout/images/home_green_7.png",
            "id": "2d7fe046fbc442f7bc7c7939ffd51784"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 8,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "成绩报告书设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/cjbgssz.png",
                    "moduleName": "成绩管理",
                    "pid": "0",
                    "del": 0,
                    "id": "ac972dc0925c40cfbb8184a21f2d9fce",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "数据采集",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/sjcj.png",
                    "moduleName": "成绩管理",
                    "pid": "0",
                    "del": 0,
                    "id": "115898de353d451e91ad2350b01c72a6",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "数据管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/sjgl.png",
                    "moduleName": "成绩管理",
                    "pid": "0",
                    "del": 0,
                    "id": "0b21e95528284a3e9e0be946cbed77a1",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "成绩报告书",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/cjbgs.png",
                    "moduleName": "成绩管理",
                    "pid": "0",
                    "del": 0,
                    "id": "3d6f332cb2674167b0ba149237b8e3a2",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "成绩管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "0b21e95528284a3e9e0be946cbed77a1",
                    "del": 1,
                    "id": "a81b7e5ca857497e9652e308f7ca3d49",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "考勤管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "0b21e95528284a3e9e0be946cbed77a1",
                    "del": 1,
                    "id": "0dbc7ac53dce46de9ace0a371294e87e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评语管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "0b21e95528284a3e9e0be946cbed77a1",
                    "del": 1,
                    "id": "a278c6067d164dbc8ce69c47fc473483",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荣誉管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "../../layout/images/main_ver1/rygl.png",
                    "moduleName": "成绩管理",
                    "pid": "0b21e95528284a3e9e0be946cbed77a1",
                    "del": 1,
                    "id": "955290d8d05744709855665657e87d3e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "健康信息管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "0b21e95528284a3e9e0be946cbed77a1",
                    "del": 1,
                    "id": "ba420beb1be348b291d7b54048c566bd",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "品行表现管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "0b21e95528284a3e9e0be946cbed77a1",
                    "del": 1,
                    "id": "0fc022dee53f4d5cbbea2ae30aa7810e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "成绩录入",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "115898de353d451e91ad2350b01c72a6",
                    "del": 1,
                    "id": "523cc650f0684717937114361eb2f02f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "考勤录入",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "115898de353d451e91ad2350b01c72a6",
                    "del": 1,
                    "id": "cbc36af0d72045948c3554e34e1c59ec",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "老师评语",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "115898de353d451e91ad2350b01c72a6",
                    "del": 1,
                    "id": "c98bfd7e401c48a182d82dec9cbc11ca",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荣誉记载",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "115898de353d451e91ad2350b01c72a6",
                    "del": 1,
                    "id": "ba19d319c41742f4950028c09c25c582",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "健康信息录入",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "115898de353d451e91ad2350b01c72a6",
                    "del": 1,
                    "id": "a0695331fad24023a3c7b6c34872a389",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "品行表现",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "115898de353d451e91ad2350b01c72a6",
                    "del": 1,
                    "id": "acdaf95eca2c4aff9eeb105e9f5a0325",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "成绩统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "3d6f332cb2674167b0ba149237b8e3a2",
                    "del": 1,
                    "id": "b06c937f52224ad59fd90af40651750d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "成绩报告书打印",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "3d6f332cb2674167b0ba149237b8e3a2",
                    "del": 1,
                    "id": "857ed9b330ed4436b33fbd535bd5482e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评分标准",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "ac972dc0925c40cfbb8184a21f2d9fce",
                    "del": 1,
                    "id": "e679c5833499402293b09a307cdcf6bf",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "品行表现指标",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "ac972dc0925c40cfbb8184a21f2d9fce",
                    "del": 1,
                    "id": "f375eb31649543abbba67d35355e3228",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "报告书模板设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "成绩管理",
                    "pid": "ac972dc0925c40cfbb8184a21f2d9fce",
                    "del": 1,
                    "id": "99a6cc826a654aa09b66b5850bdeaefe",
                    "addition": 1
                }
            ],
            "name": "成绩管理",
            "pcIcon": "../../layout/images/home_green_8.png",
            "id": "f0bf7d068456475e8bff41b5e81887b7"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 9,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学生评价",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/jsxpj.png",
                    "moduleName": "综合素质评价",
                    "pid": "0",
                    "del": 0,
                    "id": "8dd4ca3fca3147a8981a91e34a4fdb3b",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "荣誉设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "综合素质评价",
                    "pid": "8dd4ca3fca3147a8981a91e34a4fdb3b",
                    "del": 1,
                    "id": "d3b60703e0604d1698d0d4df25b15085",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "即时性评价",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "综合素质评价",
                    "pid": "8dd4ca3fca3147a8981a91e34a4fdb3b",
                    "del": 1,
                    "id": "e27e1632713e4a57bd39d5d110e68dec",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "综合评价",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "综合素质评价",
                    "pid": "8dd4ca3fca3147a8981a91e34a4fdb3b",
                    "del": 1,
                    "id": "42694e72dc3040b98bfec2be9cc6ab2b",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "评价数据统计",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "综合素质评价",
                    "pid": "8dd4ca3fca3147a8981a91e34a4fdb3b",
                    "del": 1,
                    "id": "4aa3c1dc234f481d823cf6208854b1b3",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学生荣誉记载",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "综合素质评价",
                    "pid": "8dd4ca3fca3147a8981a91e34a4fdb3b",
                    "del": 1,
                    "id": "24296367e7fd4cc98cdacfb409f820e8",
                    "addition": 1
                }
            ],
            "name": "综合素质评价",
            "pcIcon": "../../layout/images/home_green_9.png",
            "id": "e1b488a629774724b6d69fbdb9d71580"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 10,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "测评账号",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/cpzhgl.png",
                    "moduleName": "评教系统",
                    "pid": "0",
                    "del": 0,
                    "id": "d236a4232d1141d082891f14c7d43d2e",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校测评",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/xxcp.png",
                    "moduleName": "评教系统",
                    "pid": "0",
                    "del": 0,
                    "id": "9f4cd160c10b498e95df92e4ccfa8a2c",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师测评",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/jscp.png",
                    "moduleName": "评教系统",
                    "pid": "0",
                    "del": 0,
                    "id": "530d80616b2348558c0431f77a424e80",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "问卷调查",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/wjdc.png",
                    "moduleName": "评教系统",
                    "pid": "0",
                    "del": 0,
                    "id": "d263a9df1f494ce4b3391394705d20bd",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师测评结果",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "530d80616b2348558c0431f77a424e80",
                    "del": 1,
                    "id": "1aeef5f649f0407b845ccd14243867b2",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师测评统计分析",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "530d80616b2348558c0431f77a424e80",
                    "del": 1,
                    "id": "2958f9ebb1f844229c4fbcebe52edf63",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师测评_非常满意原因",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "530d80616b2348558c0431f77a424e80",
                    "del": 1,
                    "id": "aec370792cd34930b44f287ec4298a8d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师测评_不满意原因",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "530d80616b2348558c0431f77a424e80",
                    "del": 1,
                    "id": "403b59f540914818b1ddf102a9a80fd6",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师测评_表扬与建议",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "530d80616b2348558c0431f77a424e80",
                    "del": 1,
                    "id": "8c295a2217954f5484c52605eb36c3f3",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "问卷管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "530d80616b2348558c0431f77a424e80",
                    "del": 1,
                    "id": "8e48b3917c6a482b9338253c44997a61",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校测评结果",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "9f4cd160c10b498e95df92e4ccfa8a2c",
                    "del": 1,
                    "id": "43b07c6cecc648b7ba300a51ae494185",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校测评统计分析",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "9f4cd160c10b498e95df92e4ccfa8a2c",
                    "del": 1,
                    "id": "52e0a4c4fb524fe8a24d5a0cc9c3eaad",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校测评_非常满意原因",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "9f4cd160c10b498e95df92e4ccfa8a2c",
                    "del": 1,
                    "id": "9e1f5f50a0b04762912a01da8f73c24e",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校测评_不满意原因",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "9f4cd160c10b498e95df92e4ccfa8a2c",
                    "del": 1,
                    "id": "34eaf61997784f9ca48db52c50391fc7",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学校测评_表扬与建议",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "9f4cd160c10b498e95df92e4ccfa8a2c",
                    "del": 1,
                    "id": "141e444d145d4889b1c371c517e01d36",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "测评账号管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "d236a4232d1141d082891f14c7d43d2e",
                    "del": 1,
                    "id": "59f636d85857459daebc7e7ab34865dd",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "调查题库管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "d263a9df1f494ce4b3391394705d20bd",
                    "del": 1,
                    "id": "72b1aa6cdaf6472c9ffdd3fb21e0d5f5",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "调查问卷管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "评教系统",
                    "pid": "d263a9df1f494ce4b3391394705d20bd",
                    "del": 1,
                    "id": "718ae9bc1ab04676b5e78959e9f90336",
                    "addition": 1
                }
            ],
            "name": "评教系统",
            "pcIcon": "../../layout/images/home_green_10.png",
            "id": "a6ba50a7e09546ecbd3a67798553e018"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 11,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "设备管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/sbgl.png",
                    "moduleName": "数字媒体",
                    "pid": "0",
                    "del": 0,
                    "id": "3ea19c05e9744db1a01fdf57d6cf8080",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "栏目设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/lmsz.png",
                    "moduleName": "数字媒体",
                    "pid": "0",
                    "del": 0,
                    "id": "1f1c33a145724dd7b3f1191597477cbb",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "文章管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/wzgl.png",
                    "moduleName": "数字媒体",
                    "pid": "0",
                    "del": 0,
                    "id": "5c9f913ebe5240f3892bacd38685f6a8",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "沟通交流",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/gtjl.png",
                    "moduleName": "数字媒体",
                    "pid": "0",
                    "del": 0,
                    "id": "3dbc4d461be34fdfa7b145f05071f7b6",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "校级栏目设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "1f1c33a145724dd7b3f1191597477cbb",
                    "del": 1,
                    "id": "c3e221a220df447fae0b9054d216262d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级栏目设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "1f1c33a145724dd7b3f1191597477cbb",
                    "del": 1,
                    "id": "b93467a2e0354c05ba582538cf7b3452",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "留言管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "3dbc4d461be34fdfa7b145f05071f7b6",
                    "del": 1,
                    "id": "9b65ae2feb4e4cfb9de163b0b2a278b8",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班牌初始化",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "3ea19c05e9744db1a01fdf57d6cf8080",
                    "del": 1,
                    "id": "0960d490c5f14c5d96a428d95fb2770a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "大屏初始化",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "3ea19c05e9744db1a01fdf57d6cf8080",
                    "del": 1,
                    "id": "39c85c00a9284112af76aced45ec32b1",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "播放计划表",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "3ea19c05e9744db1a01fdf57d6cf8080",
                    "del": 1,
                    "id": "cd1ce0351d434cf69da79ed44e4cbf11",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "开关机计划表",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "3ea19c05e9744db1a01fdf57d6cf8080",
                    "del": 1,
                    "id": "c2d433c3ad5543bc8aa06feb4479aa7d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "校级文章管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "5c9f913ebe5240f3892bacd38685f6a8",
                    "del": 1,
                    "id": "0ef13aec2eb74e10909d16fd8899eb0f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级文章管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "数字媒体",
                    "pid": "5c9f913ebe5240f3892bacd38685f6a8",
                    "del": 1,
                    "id": "e93c7fe41cba4857a388dab5c83be356",
                    "addition": 1
                }
            ],
            "name": "数字媒体",
            "pcIcon": "../../layout/images/home_green_11.png",
            "id": "06967180288148cdbc9b2851ce5f940c"
        },
        {
            "pcOpenUrl": "",
            "serialNumber": 12,
            "functionalItems": [
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "基础数据",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/jcsj.png",
                    "moduleName": "系统管理",
                    "pid": "0",
                    "del": 0,
                    "id": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "用户管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/yhgl.png",
                    "moduleName": "系统管理",
                    "pid": "0",
                    "del": 0,
                    "id": "54f33b4587d34f598e972a5c6a79cdfa",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "权限管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/qxgl.png",
                    "moduleName": "系统管理",
                    "pid": "0",
                    "del": 0,
                    "id": "1f8171de66804a9a95277ea4d04d9fb4",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "数据字典",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/dictionary.png",
                    "moduleName": "系统管理",
                    "pid": "0",
                    "del": 0,
                    "id": "8c1c38d1508742d2a34f4d82f1b63348",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "app设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 0,
                    "pcIcon": "../../layout/images/main_ver1/appsz.png",
                    "moduleName": "系统管理",
                    "pid": "0",
                    "del": 0,
                    "id": "70f7b4d860b14bda9abdc581b114f085",
                    "addition": 0
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "权限角色",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "1f8171de66804a9a95277ea4d04d9fb4",
                    "del": 1,
                    "id": "3d6ce6c106da41cdaf4bd930b64b580d",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "校训管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "a90e702f3dd045eaa26200e6f08d75e4",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学年设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "9bc975e61be74c9db3d4035f863af4a5",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "年级设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "7ae33603d24d421a9a15a358b643465c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学科设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "097a06a9aa98413697e85eb9b4195020",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "部门设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "bcc45b789d9f45a4b1142c75a7cf54ff",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班级设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "932a4d7e0b574fe1833bdbbd53bd9c70",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "班主任设置",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "2a221f632bd14a2ebd3ae2b77319d0b9",
                    "del": 1,
                    "id": "ab9e186878974830b5ad14bdda807690",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师用户管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "1fc649a966e44ce1a9a5133746af8b7c",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "用户调入审核",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "0f5a86f14da947bbbf683ff9a2efb76a",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "系统管理员审核",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "a5aa5359750448bdb880c639f4219dc1",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学科管理员审核",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "fb3c4aacb0154fab8a31cd32c25aab94",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "教师角色审核",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "e5528c52746e4a09ac21ed165b698368",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "家长用户管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "b61b4567fdc642828b8f7f5aba8f72db",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "学生用户管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "54f33b4587d34f598e972a5c6a79cdfa",
                    "del": 1,
                    "id": "4dfddd3e9d384ffd9c859e21a707014f",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "启动图管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "70f7b4d860b14bda9abdc581b114f085",
                    "del": 1,
                    "id": "7cdfeadde57246a48c6c53e45c1c0ae1",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "APP版本更新",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "70f7b4d860b14bda9abdc581b114f085",
                    "del": 1,
                    "id": "38cf210279eb4a0c8a9a4596618cee62",
                    "addition": 1
                },
                {
                    "pcOpenUrl": "",
                    "appOpenUrl": "",
                    "itemName": "数据字典管理",
                    "appIcon": "",
                    "hasPopedom": 1,
                    "edit": 1,
                    "pcIcon": "",
                    "moduleName": "系统管理",
                    "pid": "8c1c38d1508742d2a34f4d82f1b63348",
                    "del": 1,
                    "id": "3148329dc7934374a2af42e539ed7e1c",
                    "addition": 1
                }
            ],
            "name": "系统管理",
            "pcIcon": "../../layout/images/home_green_12.png",
            "id": "4abd251be1a147228c3980ce9a2a4e89"
        }
    ],
    "userId": "c0eed81095c1462a8d540014104ef04b",
    "teacherArrangements": [
        
    ],
    "realName": "许强",
    "unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
    "schoolYear": "2017-2018",
    "semester": 1,
    "id": "c0eed81095c1462a8d540014104ef04b",
    "depts": [
        {
            "deptName": "校长室",
            "name": "校长室",
            "id": "f7611c92ad364a089f178967f5f5389b",
            "job": ""
        }
    ]
}
	export default {
		name:"mainHeader",
		data (){
			return {
				mainUser:user,
				login_access_token:login_access_token
			}
		},
		methods:{
			gotoOtherModule:function(itemId,itemName){
				this.$router.push({path:'/table',query:{accsee_token:this.login_access_token,platformName:itemName,platformId:itemId }});
			}
		}
		
	}
</script>

<style scoped>
	 @import "../assets/iconfont/iconfont.css";  
	.el-icon-big{
		font-size:28px;
		vertical-align: "middle";
	}
	
	.notice,.functionalIcon{margin-right:20px;}
	.el-dropdown-li-a{text-align:center;text-decoration: none;}
	.pull-right{text-align:right}
</style>