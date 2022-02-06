import Chart from 'react-apexcharts';

const Home = () => {

    const series = [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }];
    const options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    return (
        <div className="main-container">

            <div className="xs-pd-20-10 pd-ltr-20">

                <div className="title pb-20">
                    <h2 className="h3 mb-0">Общие сведенья</h2>
                </div>

                <div className="row pb-10">
                    <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                        <div className="card-box height-100-p widget-style3">
                            <div className="d-flex flex-wrap">
                                <div className="widget-data">
                                    <div className="weight-700 font-24 text-dark">75</div>
                                    <div className="font-14 text-secondary weight-500">Доход</div>
                                </div>
                                <div className="widget-icon">
                                    <div className="icon" style={{color: "#00eccf"}}><i
                                        className="icon-copy dw dw-calendar1"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                        <div className="card-box height-100-p widget-style3">
                            <div className="d-flex flex-wrap">
                                <div className="widget-data">
                                    <div className="weight-700 font-24 text-dark">124,551</div>
                                    <div className="font-14 text-secondary weight-500">Количество скачиваний</div>
                                </div>
                                <div className="widget-icon">
                                    <div className="icon" style={{color: "#ff5b5b"}}><span
                                        className="icon-copy ti-heart"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                        <div className="card-box height-100-p widget-style3">
                            <div className="d-flex flex-wrap">
                                <div className="widget-data">
                                    <div className="weight-700 font-24 text-dark">400+</div>
                                    <div className="font-14 text-secondary weight-500">Количество идей</div>
                                </div>
                                <div className="widget-icon">
                                    <div className="icon"><i className="icon-copy fa fa-stethoscope" aria-hidden="true"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 mb-20">
                        <div className="card-box height-100-p widget-style3">
                            <div className="d-flex flex-wrap">
                                <div className="widget-data">
                                    <div className="weight-700 font-24 text-dark">$50,000</div>
                                    <div className="font-14 text-secondary weight-500">Количество проектов</div>
                                </div>
                                <div className="widget-icon">
                                    <div className="icon" style={{color: "#09cc06"}}><i className="icon-copy fa fa-money" aria-hidden="true"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pb-10">
                    <div className="col-md-8 mb-20">
                        <div className="card-box height-100-p pd-20">
                            <div className="d-flex flex-wrap justify-content-between align-items-center pb-0 pb-md-3">
                                <div className="h5 mb-md-0">Скачиваний приложений</div>
                                <div className="form-group mb-md-0">
                                    <select className="form-control form-control-sm selectpicker">
                                        <option value="">Last Week</option>
                                        <option value="">Last Month</option>
                                        <option value="">Last 6 Month</option>
                                        <option value="">Last 1 year</option>
                                    </select>
                                </div>
                            </div>
                            <Chart options={options} series={series} type="area" height={350}/>
                        </div>
                    </div>
                    <div className="col-md-4 mb-20">
                        <div className="card-box min-height-200px pd-20 mb-20" style={{backgroundColor: "#455a64"}}>
                            <div className="d-flex justify-content-between pb-20 text-white">
                                <div className="icon h1 text-white">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                </div>
                                <div className="font-14 text-right">
                                    <div><i className="icon-copy ion-arrow-up-c"></i> 2.69%</div>
                                    <div className="font-12">Since last month</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-end">
                                <div className="text-white">
                                    <div className="font-14">Appointment</div>
                                    <div className="font-24 weight-500">1865</div>
                                </div>
                                <div className="max-width-150">
                                    <div id="appointment-chart"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-box min-height-200px pd-20" style={{backgroundColor: "#265ed7"}}>
                            <div className="d-flex justify-content-between pb-20 text-white">
                                <div className="icon h1 text-white">
                                    <i className="fa fa-stethoscope" aria-hidden="true"></i>
                                </div>
                                <div className="font-14 text-right">
                                    <div><i className="icon-copy ion-arrow-down-c"></i> 3.69%</div>
                                    <div className="font-12">Since last month</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-end">
                                <div className="text-white">
                                    <div className="font-14">Surgery</div>
                                    <div className="font-24 weight-500">250</div>
                                </div>
                                <div className="max-width-150">
                                    <div id="surgery-chart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-box pb-10">
                    <div className="h5 pd-20 mb-0">Активность</div>
                    <table className="data-table table nowrap">
                        <thead>
                        <tr>
                            <th className="table-plus">Name</th>
                            <th>Gender</th>
                            <th>Weight</th>
                            <th>Assigned Doctor</th>
                            <th>Admit Date</th>
                            <th>Disease</th>
                            <th className="datatable-nosort">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo4.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Jennifer O. Oster</div>
                                    </div>
                                </div>
                            </td>
                            <td>Female</td>
                            <td>45 kg</td>
                            <td>Dr. Callie Reed</td>
                            <td>19 Oct 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Typhoid</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"></i></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"></i></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo5.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Doris L. Larson</div>
                                    </div>
                                </div>
                            </td>
                            <td>Male</td>
                            <td>76 kg</td>
                            <td>Dr. Ren Delan</td>
                            <td>22 Jul 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Dengue</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"></i></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"></i></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo6.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Joseph Powell</div>
                                    </div>
                                </div>
                            </td>
                            <td>Male</td>
                            <td>90 kg</td>
                            <td>Dr. Allen Hannagan</td>
                            <td>15 Nov 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Infection</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"></i></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"></i></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo9.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Jake Springer</div>
                                    </div>
                                </div>
                            </td>
                            <td>Female</td>
                            <td>45 kg</td>
                            <td>Dr. Garrett Kincy</td>
                            <td>08 Oct 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Covid 19</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"/></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"/></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo1.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Paul Buckland</div>
                                    </div>
                                </div>
                            </td>
                            <td>Male</td>
                            <td>76 kg</td>
                            <td>Dr. Maxwell Soltes</td>
                            <td>12 Dec 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Asthma</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"/></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"/></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo2.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Neil Arnold</div>
                                    </div>
                                </div>
                            </td>
                            <td>Male</td>
                            <td>60 kg</td>
                            <td>Dr. Sebastian Tandon</td>
                            <td>30 Oct 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Diabetes</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"/></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"/></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo8.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Christian Dyer</div>
                                    </div>
                                </div>
                            </td>
                            <td>Male</td>
                            <td>80 kg</td>
                            <td>Dr. Sebastian Tandon</td>
                            <td>15 Jun 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Diabetes</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"/></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"/></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-plus">
                                <div className="name-avatar d-flex align-items-center">
                                    <div className="avatar mr-2 flex-shrink-0">
                                        <img src="vendors/images/photo1.jpg" className="border-radius-100 shadow"
                                             width="40" height="40" alt=""/>
                                    </div>
                                    <div className="txt">
                                        <div className="weight-600">Doris L. Larson</div>
                                    </div>
                                </div>
                            </td>
                            <td>Male</td>
                            <td>76 kg</td>
                            <td>Dr. Ren Delan</td>
                            <td>22 Jul 2020</td>
                            <td><span className="badge badge-pill" data-bgcolor="#e7ebf5"
                                      data-color="#265ed7">Dengue</span></td>
                            <td>
                                <div className="table-actions">
                                    <a href="#" data-color="#265ed7"><i className="icon-copy dw dw-edit2"/></a>
                                    <a href="#" data-color="#e95959"><i className="icon-copy dw dw-delete-3"/></a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


            </div>

            {/*<div className="xs-pd-20-10 pd-ltr-20">*/}
            {/*    <div className="title pb-20">*/}
            {/*        <h2 className="h3 mb-0">Общие сведенья</h2>*/}
            {/*    </div>*/}

            {/*    <div className="row pb-10">*/}
            {/*        <div className="col-xl-3 col-lg-3 col-md-6 mb-20">*/}
            {/*            <div className="card-box height-100-p widget-style3">*/}
            {/*                <div className="d-flex flex-wrap">*/}
            {/*                    <div className="widget-data">*/}
            {/*                        <div className="weight-700 font-24 text-dark">75</div>*/}
            {/*                        <div className="font-14 text-secondary weight-500">Доход</div>*/}
            {/*                    </div>*/}
            {/*                    <div className="widget-icon">*/}
            {/*                        <div className="icon" style={{color: "#00eccf"}}><i*/}
            {/*                            className="icon-copy dw dw-calendar1"/></div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-xl-3 col-lg-3 col-md-6 mb-20">*/}
            {/*            <div className="card-box height-100-p widget-style3">*/}
            {/*                <div className="d-flex flex-wrap">*/}
            {/*                    <div className="widget-data">*/}
            {/*                        <div className="weight-700 font-24 text-dark">124,551</div>*/}
            {/*                        <div className="font-14 text-secondary weight-500">Количество скачиваний</div>*/}
            {/*                    </div>*/}
            {/*                    <div className="widget-icon">*/}
            {/*                        <div className="icon" style={{color: "#ff5b5b"}}><span*/}
            {/*                            className="icon-copy ti-heart"/></div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-xl-3 col-lg-3 col-md-6 mb-20">*/}
            {/*            <div className="card-box height-100-p widget-style3">*/}
            {/*                <div className="d-flex flex-wrap">*/}
            {/*                    <div className="widget-data">*/}
            {/*                        <div className="weight-700 font-24 text-dark">400+</div>*/}
            {/*                        <div className="font-14 text-secondary weight-500">Количество идей</div>*/}
            {/*                    </div>*/}
            {/*                    <div className="widget-icon">*/}
            {/*                        <div className="icon"><i className="icon-copy fa fa-stethoscope"*/}
            {/*                                                 aria-hidden="true"/></div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-xl-3 col-lg-3 col-md-6 mb-20">*/}
            {/*            <div className="card-box height-100-p widget-style3">*/}
            {/*                <div className="d-flex flex-wrap">*/}
            {/*                    <div className="widget-data">*/}
            {/*                        <div className="weight-700 font-24 text-dark">$50,000</div>*/}
            {/*                        <div className="font-14 text-secondary weight-500">Количество проектов</div>*/}
            {/*                    </div>*/}
            {/*                    <div className="widget-icon">*/}
            {/*                        <div className="icon" style={{color: "#09cc06"}}><i*/}
            {/*                            className="icon-copy fa fa-money"*/}
            {/*                            aria-hidden="true"/></div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*    <div className="row pb-10">*/}
            {/*        <div className="col-xl-12 col-lg-12 col-md-12 mb-10">*/}
            {/*            <div className="card-box height-100-p pd-20">*/}
            {/*                <div className="d-flex flex-wrap justify-content-between align-items-center pb-0 pb-md-3">*/}
            {/*                    <div className="h5 mb-md-0">Скачиваний приложений</div>*/}
            {/*                    <div className="form-group mb-md-0">*/}
            {/*                        <select className="form-control form-control-sm selectpicker">*/}
            {/*                            <option value="">Last Week</option>*/}
            {/*                            <option value="">Last Month</option>*/}
            {/*                            <option value="">Last 6 Month</option>*/}
            {/*                            <option value="">Last 1 year</option>*/}
            {/*                        </select>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                /!*<div id="activities-chart"/>*!/*/}
            {/*                <Chart options={options} series={series} type="area" height={350}/>*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*    </div>*/}


            {/*</div>*/}

        </div>
    );
}

export default Home;