import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../redux/actions";

import React from "react";

function Detail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const myCh = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  return (
    <div>
      {myCh ? (
        <div>
          <h1> Soy {myCh.name} </h1>
          <img src={myCh.img} alt="ch img" width="500px" height="300px" />
          <h2>Status: {myCh.status} </h2>
          <p>
            Status:
            {!myCh.createdInDb
              ? myCh.occupation + " "
              : myCh.occupations.map((el) => el.name + " ")}
          </p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}

export default Detail;
