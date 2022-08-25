import {useContext, useEffect, useState} from "react";
import BlocksService from "../../services/blocks.service";
import {AuthContext} from "../../context/auth-context";
import "./block.css";
import {Link} from "react-router-dom";
import {BarWave} from "react-cssfx-loading";

const Blocks = () => {

    const {token} = useContext(AuthContext);
    const [blocks, setBlocks] = useState(null);
    const [index, setIndex] = useState(3);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const response = await BlocksService.getBlocks(token, index);
        setBlocks(response.data);
        setLoading(false);
    }, [index]);

    const changeIcon = (i) => {
        if (i === 0)
            return <i className="fa fa-telegram"></i>;
        else if (i === 1)
            return <i className="fa fa-inbox"></i>;
        else if (i === 2)
            return <i className="fa fa-desktop"></i>;
        else if (i === 3)
            return <i className="fa fa-digg"></i>;
    }

    // const updateBlocks = async (i) => {
    //     const res = await BlocksService.getBlocks(token, i);
    //     setBlocks(res.data);
    // };

    return <section>

        <div className="pd-20">
            <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active text-blue" data-toggle="tab" href="#block3" role="tab"
                       aria-selected="true" onClick={() => setIndex(3)}>Физический</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-blue" data-toggle="tab" href="#block2" role="tab"
                       aria-selected="false" onClick={() => setIndex(2)}>Интерент</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-blue" data-toggle="tab" href="#block1" role="tab"
                       aria-selected="false" onClick={() => setIndex(1)}>Цыфровой</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-blue" data-toggle="tab" href="#block0" role="tab"
                       aria-selected="false" onClick={() => setIndex(0)}>Технология</a>
                </li>

            </ul>
        </div>
        {loading ? <BarWave className="loaderBar"/> : <div className="row">
            {
                blocks?.map(value => (

                    <div className="col-sm-6 col-lg-4" key={value.id}>
                        <Link to={'/view-block/' + value.id}>
                            <div className="feature-box-1">
                                <div className="icon">
                                    {changeIcon(index)}
                                    {/*<i className="fa fa-telegram"></i>*/}
                                </div>
                                <div className="feature-content">
                                    <h5>{value.name}</h5>
                                    <p>{value.description.slice(0, 120)}...</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))
            }
        </div>}

        {/*<div className="container">*/}
        {/*    <div className="row mt-60">*/}
        {/*        {*/}
        {/*            blocks?.map(value => (*/}
        {/*                <div className="col-lg-4 col-md-6 margin-30px-bottom xs-margin-20px-bottom" key={value.id}>*/}
        {/*                    <div className="service-block4 h-100">*/}
        {/*                        <div className="service-icon">*/}
        {/*                            <i className="icon-layers"></i>*/}
        {/*                        </div>*/}
        {/*                        <div className="service-desc">*/}
        {/*                            <h4>{value.name.slice(0, 20)}</h4>*/}
        {/*                            <h5>{value.max_length}</h5>*/}
        {/*                            <p>{value.description.slice(0, 120)}...</p>*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            ))*/}
        {/*        }*/}
        {/*    */}
        {/*    </div>*/}
        {/*</div>*/}


    </section>
};

export default Blocks;