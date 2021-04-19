// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

export default {
  'POST  /api/mydatasource/upload': (_: Request, res: Response) => {
    return res.json(
        {
            "fileName": "新建Microsoft Excel 工作表",
            "sheets": [
                {
                    "sheetName": "Sheet1",
                    "id": null,
                    "name": null,
                    "userid": null,
                    "empty": false
                }
            ],
            "fileType": "EXCEL",
            "fileId": "8af98883785fb7a30178d9f8c5e90687"
        }
    )
  },

  'POST  /api/mydatasource/sheetfield': (_: Request, res: Response) => {
    return res.json(
        [
            {
                "fileId": "8af98883785fb7a30178d9f8c5e90687",
                "sheetName": "Sheet1",
                "pCode": "",
                "workName": "新建Microsoft Excel 工作表",
                "tag": "",
                "remark": "",
                "uploadDate": null,
                "rowNum": 1,
                "colTypes": [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1
                ],
                "colNames": [
                    "线下",
                    "自建渠道",
                    "某猫",
                    "某东",
                    "某拼",
                    "线上",
                    "",
                    ""
                ],
                "colNums": null,
                "data": [
                    [
                        "线下",
                        "自建渠道",
                        "某猫",
                        "某东",
                        "某拼",
                        "线上",
                        "",
                        ""
                    ],
                    [
                        "90",
                        "80",
                        "30",
                        "28",
                        "30",
                        "88",
                        "",
                        ""
                    ],
                    [
                        "name",
                        "a",
                        "b",
                        "c",
                        "d-1",
                        "d-2",
                        "d-3",
                        "d"
                    ],
                    [
                        "value",
                        "0.2",
                        "0.3",
                        "0.2",
                        "0.12",
                        "0.1",
                        "0.08",
                        "0.3"
                    ]
                ],
                "tbId": null,
                "uuids": null,
                "hasChecked": null,
                "pCodeName": "根目录",
                "storeType": null,
                "workTableEngineDTO": null
            }
        ]
    )
  },

  'POST  /api/mydatasource/setSheet': (_: Request, res: Response) => {
    return res.json(

    )
  },
};

