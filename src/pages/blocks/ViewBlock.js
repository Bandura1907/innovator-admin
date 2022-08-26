import {Link, Redirect, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import BlocksService from "../../services/blocks.service";
import {BarWave} from "react-cssfx-loading";

const ViewBlock = () => {
    const id = useParams().id
    const {token} = useContext(AuthContext);
    const [block, setBlock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(async () => {
        const res = await BlocksService.getBlockById(token, id);
        setBlock(res.data);
        setLoading(false);
    }, []);

    const deleteBlock = async () => {
        if (window.confirm("Вы уверены что хотите удалить блок?")) {
            await BlocksService.deleteBlock(token, id);
            setRedirect(true);
        }
    };

    if (redirect)
        return <Redirect to="/blocks"/>


    return loading ? <BarWave className="loaderBar"/> : <div className="main-container">
        <div className="blog-wrap">
            <div className="container pd-0">
                <div className="pull-right">
                    <Link to={'/edit-block/' + id}>
                        <button type="submit" className="btn btn-primary btn-sm scroll-click" rel="content-y"
                                data-toggle="collapse">Редактировать
                        </button>
                    </Link>
                    <button type="submit" className="btn btn-danger btn-sm scroll-click m-1" rel="content-y"
                            data-toggle="collapse" onClick={deleteBlock}>Удалить
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="blog-detail card-box overflow-hidden mb-30">
                            {/*<div className="blog-img">*/}
                            {/*    <img src={!article.pictureUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf91yfOT2B7vCu4ikHj54dlXtsCAo7ZzeCw&usqp=CAU" : article.pictureUrl} alt="" width="1120"/>*/}
                            {/*</div>*/}
                            <div className="blog-caption">
                                <h4 className="mb-10">{block?.name}</h4>
                                <p>{block?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default ViewBlock;