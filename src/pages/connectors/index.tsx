import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';

import MyIcon from '@/utils/iconUtils';

import type { Dispatch } from 'umi';
import { Link, connect } from 'umi';
import type { StateType } from './model';


import styles from './style.less';

const connectCates = [
    {
        "res":"connect-file",
        "name":"文件",
        "type":"func",
        "action":[],
        "restful":[],
        "extend":{},
        "href": "/connectors/upload",
        "children":[{
            "res":"connect-file-excel",
            "name":"Excel",
            "type":"app",
            "icon": "ygmat-connect-file-excel",
            "actionname":["Excel"],
            "action":["/application/upload"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-file-csv",
            "name":"CSV",
            "type":"app",
            "icon": "ygmat-connect-file-csv",
            "actionname":["CSV"],
            "action":["/application/upload"],
            "restful":[],
            "extend":{}
        }]
    },{
        "res":"connect-database",
        "name":"数据库连接",
        "type":"func",
        "action":[],
        "restful":[],
        "extend":{},
        "href": "/connectors/database",
        "children":[{
            "res":"connect-database-oracle",
            "name":"Oracle",
            "type":"app",
            "icon": "ygmat-connect-db-oracle",
            "actionname":["Oracle"],
            "action":["/application/sqlDataSource?oracle"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-mysql",
            "name":"Mysql",
            "type":"app",
            "icon": "ygmat-connect-db-mysql",
            "actionname":["Mysql"],
            "action":["/application/sqlDataSource?mysql"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-postgresql",
            "name":"Postgresql",
            "type":"app",
            "icon": "ygmat-connect-db-postgresql",
            "actionname":["Postgresql"],
            "action":["/application/sqlDataSource?postgresql"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-clickhouse",
            "name":"ClickHouse",
            "type":"app",
            "icon": "ygmat-connect-db-clickhouse",
            "actionname":["ClickHouse"],
            "action":["/application/sqlDataSource?clickhouse"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-gbase",
            "name":"GBase",
            "type":"app",
            "icon": "ygmat-connect-db-gbase",
            "actionname":["GBase"],
            "action":["/application/sqlDataSource?GBase"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-dm",
            "name":"达梦数据库",
            "type":"app",
            "icon": "ygmat-connect-db-dm",
            "actionname":["dm"],
            "action":["/application/sqlDataSource?dm"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-hive",
            "name":"Hive",
            "type":"app",
            "icon": "ygmat-connect-db-hive",
            "actionname":["Hive"],
            "action":["/application/sqlDataSource?hive"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-sqlserver",
            "name":"SQLServer",
            "type":"app",
            "icon": "ygmat-connect-db-sqlserver",
            "actionname":["SQLServer"],
            "action":["/application/sqlDataSource?sqlserver"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-rds-mysql",
            "name":"RdsMysql",
            "type":"app",
            "icon": "ygmat-connect-db-rds-mysql",
            "actionname":["RdsMysql"],
            "action":["/application/sqlDataSource?rds_mysql"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-gaussdb",
            "name":"GaussDB",
            "type":"app",
            "icon": "ygmat-connect-db-gaussdb",
            "actionname":["GaussDB"],
            "action":["/application/sqlDataSource?gaussdb_200"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-spark",
            "name":"Spark",
            "type":"app",
            "icon": "ygmat-connect-db-spark",
            "actionname":["Spark"],
            "action":["/application/sqlDataSource?spark"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-greenplum",
            "name":"Greenplum",
            "type":"app",
            "icon": "ygmat-connect-db-greenplum",
            "actionname":["Greenplum"],
            "action":["/application/sqlDataSource?greenplum"],
            "restful":[],
            "extend":{}
        },{
            "res":"connect-database-mariadb",
            "name":"MariaDB",
            "type":"app",
            "icon": "ygmat-connect-db-mariadb",
            "actionname":["MariaDB"],
            "action":["/application/sqlDataSource?mariadb"],
            "restful":[],
            "extend":{}
        }]
    }
]

interface ConnectorsProps {
    connectors: StateType;
    dispatch: Dispatch;
    loading: boolean;
}


class Connectors extends Component<ConnectorsProps> {
    

    render() {
        return (
            <>
                {connectCates.map((cate, i) => (
                    <Card title={cate.name} key={cate.res} className={styles.cardCate} >
                        <Row gutter={[48, 24]}>
                            {cate.children.map((item, j) => (
                                <Col xl={4} lg={6} md={8} sm={8} xs={8} key={j} >

                                    <Card className={styles.cardItem}>

                                        <MyIcon className={styles.icon} type={item.icon.replace(/^ygmat/, 'icon')}
                                        />
                                        <Link to={cate.href} >
                                            <p className={styles.text}>{item.name}</p>
                                        </Link>
                                    </Card>


                                </Col>
                            ))}
                        </Row>
                    </Card>
                ))}
            </>
        );
    }
    
};


export default connect(({ connectors, }: { connectors: StateType; }) => ({
        connectors, // 传入参数
    }),
)(Connectors);

