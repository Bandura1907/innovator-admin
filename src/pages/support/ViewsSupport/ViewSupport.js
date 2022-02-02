import './viewSupport.css';
import {Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {BarWave} from "react-cssfx-loading";
import {URL} from "../../../services/url";
import {injectStyle} from "react-toastify/dist/inject-style";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";


const ViewSupport = () => {

    function status(status) {
        if (status === "Новый") {
            return <span className="badge badge-warning">{status}</span>;
        } else if (status === "Отменено") {
            return <span className="badge badge-danger">{status}</span>;
        } else if (status === "Решено") {
            return <span className="badge badge-success">{status}</span>;
        } else return <span className="badge badge-secondary">{status}</span>;
    }

    const id = useParams().id;

    const [redirect, setRedirect] = useState(false);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [report, setReport] = useState({});
    const [user, setUser] = useState({});
    const [myLoader, setMyLoader] = useState(true);
    const header = {
        Authorization: `Bearer ${token}`
    };

    const [subjectEmpty, setSubjectEmpty] = useState(false);
    const [messageEmpty, setMessageEmpty] = useState(false);
    const [sendMailLoader, setSendMailLoader] = useState(false);

    const subjectRef = useRef();
    const messageRef = useRef();

    const fetchNews = useCallback(async () => {
        try {
            const fetchedReport = await request(`${URL}/api/report_by_id/${id}`, "GET", null, header);

            setReport(fetchedReport);
            setUser(fetchedReport.user);
            setMyLoader(false);
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [id]);

    const solveProblem = async (e) => {
        e.preventDefault();
        await request(`${URL}/api/solve_the_problem/${id}`, "PUT", null, header);

        setRedirect(true);
    }

    const sendMail = e => {
        e.preventDefault();
        setSendMailLoader(true);

        if (subjectRef.current.value === "") {
            subjectRef.current.className = "form-control form-control-danger";
            setSubjectEmpty(true);
        }

        if (messageRef.current.value === "") {
            messageRef.current.className = "form-control form-control-danger";
            setMessageEmpty(true);
        }

        if (messageRef.current.value !== "" && subjectRef.current.value !== "") {
            setMessageEmpty(false);
            setSubjectEmpty(false);
            messageRef.current.className = "form-control";
            subjectRef.current.className = "form-control";
            axios.post(`${URL}/api/report/sendMail`, {
                to: report.customEmail,
                subject: subjectRef.current.value,
                text: messageRef.current.value
            }, {headers: header}).then(() => {
                subjectRef.current.value = "";
                messageRef.current.value = "";
                toast.info("Отправленно", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

            }).catch(err => {
                if (err.response.status === 400) {
                    console.log("daadsdas")
                    toast.error("Пользователь указал неправильный email", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            });

        }
        setSendMailLoader(false);
    }

    if (typeof window !== 'undefined') {
        injectStyle();
    }

    if (redirect)
        return <Redirect to="/support"/>

    return (
        myLoader ? <BarWave className="loaderBar"/> : <div className="container bootdey flex-grow-1 container-p-y">
            <div className="media align-items-center py-3 mb-3">
                <img src={user.photoUrl} alt="Фото пользователя"
                     className="d-block ui-w-100 rounded-circle"/>
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold mb-0">{user.fullName}</h4>
                    <div className="text-muted mb-2">{report.customEmail}</div>
                </div>
            </div>

            <div className="card-box mb-4">

                <div className="card-body">
                    <div className="blog-caption">
                        <h4 className="mb-10">Статус: {status(report.status)}</h4>
                        <p>{report.messageText}</p>
                    </div>


                    <button onClick={solveProblem} type="submit" className="btn btn-primary btn-sm scroll-click"
                            rel="content-y"
                            data-toggle="collapse">Проблема решена
                    </button>

                </div>
            </div>

            <form onSubmit={sendMail}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <input id="subject" type="text" placeholder="Subject"
                                   className="form-control"
                                   ref={subjectRef}
                            />
                            {
                                subjectEmpty ? <div className="has-danger">
                                    <div className="form-control-feedback">Поле объязательно к заполнению</div>
                                </div> : null
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                        <textarea id="message" placeholder="Message"
                                  ref={messageRef}
                                  className="form-control"
                                  rows="3"
                        />
                            {
                                messageEmpty ? <div className="has-danger">
                                    <div className="form-control-feedback">Поле объязательно к заполнению</div>
                                </div> : null
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="send">
                            <button id="send_message" className="px-btn theme" type="submit"><span>Отправить</span> <i
                                className="arrow"/></button>
                        </div>
                    </div>
                </div>
            </form>

            <ToastContainer/>
        </div>
    );
};

export default ViewSupport;