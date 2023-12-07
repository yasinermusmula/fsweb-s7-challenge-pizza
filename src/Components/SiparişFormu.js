import React, { useState, useEffect } from "react";
import "../Css/SiparişFormu.css";
import LogoSvg from "../logo.svg";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  ButtonGroup,
  ButtonToolbar,
  FormFeedback,
} from "reactstrap";

import { useHistory } from "react-router-dom";

const initialValues = {
  name: "",
  boyut: "",
  hamur: "",
  secenekler: [],
  instructions: "",
  adet: 1,
  ücret: 85.5,
  ekücret: "",
  rate: 8.9,
  comments: 200,
};

const initialErrors = {
  name: "",
  boyut: "",
  hamur: "",
  secenekler: [],
  instructions: "",
};

const secenekler = [
  "pepperoni",
  "sosis",
  "Jambon",
  "Tavuk",
  "soğan",
  "domates",
  "mısır",
  "sucuk",
  "jalepeno",
  "sarımsak",
  "biber",
  "kabak",
  "salam",
];

const SiparisFormu = () => {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const [disabled, setDisabled] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [price, setPrice] = useState(initialValues.ücret);
  const [counter, setCounter] = useState(1);
  const [malzemeSayısı, setMalzemeSayısı] = useState(0);
  const perCost = 5;
  const history = useHistory();

  const ekücret = perCost * malzemeSayısı;
  const totalPrice = (price + ekücret) * counter;

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmit(!submit);

    console.log("submit çalıştı");
    history.push("/succes");
  };

  const check = (e) => {
    const updatedSecenekler = {
      ...data.secenekler,
      [e.target.name]: e.target.checked,
    };
    setData({ ...data, secenekler: updatedSecenekler });

    let newMalzemeSayısı = 0;
    let newPrice = 0;

    for (const secenek in updatedSecenekler) {
      if (updatedSecenekler[secenek]) {
        newMalzemeSayısı++;
      }
    }

    setMalzemeSayısı(newMalzemeSayısı);
    setPrice(price + newPrice);

    // 10'dan fazla seçili malzeme varsa hata mesajını ayarla
    if (newMalzemeSayısı < 4) {
      setErrors({
        ...errors,
        secenekler: "En az 4 malzeme seçebilirsiniz.",
      });
    } else if (newMalzemeSayısı > 10) {
      setErrors({
        ...errors,
        secenekler: "En fazla 10 malzeme seçebilirsiniz.",
      });
    } else {
      // 10'dan fazla seçili malzeme yoksa hata mesajını temizle
      setErrors({ ...errors, secenekler: "" });
    }
  };

  const arttır = (e) => {
    setCounter(counter + 1);
  };

  const azalt = (e) => {
    if (counter >= 1) setCounter(counter - 1);
    if (counter <= 1) setCounter(1);
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("bu alanı doldurmak zorunludur.")
      .min(2, "isim en az 2 karakter olmalıdır"),
    boyut: Yup.mixed()
      .oneOf(["Küçük", "Orta", "Büyük"], "Bir tanesini seçmelisiniz.")
      .required("Seçim yapınız"),
    hamur: Yup.mixed().oneOf(
      ["ince", "orta", "kalın"],
      "Bir tanesini seçmelisiniz."
    ),
    secenekler: Yup.array()
      .min(4, "En az 4 tane seçebilirsiniz")
      .max(10, "En fazla 10 tane seçebilirsiniz.")
      .default(0)
      .required(),

    instructions: Yup.string().required("bu alanı doldurmak zorunludur."),
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    Yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });

    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    schema.isValid(data).then((valid) => setDisabled(!valid));
  }, [data, schema]);

  useEffect(() => {
    setData({
      ...data,
      price: price,
      ekücret: malzemeSayısı * perCost,
    });
  }, [totalPrice]);

  useEffect(() => {
    setData({ ...data, count: counter });
  }, [counter]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div>
      <nav className="nav">
        <img src={LogoSvg} alt="" className="logo" />
        <div className="info-container">
          <Link to="/ ">Anasayfa</Link>
          <Link>Seçenekler</Link>
          <Link>Sipariş Oluştur</Link>
        </div>
      </nav>
      <form className="main-container" onSubmit={onSubmit}>
        <div className="main-info-container">
          <h2>Position Absolute Acı Pizza</h2>
          <div className="about-pizza">
            <span>89TL</span>
            <div className="reviews">
              <span>{data.rate}</span>
              <span>({data.comments})</span>
            </div>
          </div>
          <p>
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre.Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşanİtalyan
            kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizetta
            denir.
          </p>

          <FormGroup>
            <Label htmlFor="name-input">
              <h3>İsim: </h3>
            </Label>
            <Input
              id="name-input"
              name="name"
              placeholder="isim yazınız"
              type="text"
              onChange={changeHandler}
              value={data.name}
              invalid={!!errors.name}
              data-cy="name-input"
            />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>

          <div className="options">
            <div className="first-option">
              <Label htmlFor="size-dropdown" sm={2}>
                <h3>
                  Boyut Sec <span className="spacial-span">*</span>
                </h3>
              </Label>

              <FormGroup check htmlFor="size-dropdown">
                <Label check>
                  <Input
                    type="radio"
                    name="boyut"
                    id="size-dropdown"
                    value="Küçük"
                    data-cy="size-dropdown"
                    invalid={errors.boyut}
                    onChange={changeHandler}
                  />
                  Küçük
                </Label>
              </FormGroup>
              <FormGroup check htmlFor="size-dropdown">
                <Label check>
                  <Input
                    type="radio"
                    name="boyut"
                    id="size-dropdown"
                    value="Küçük"
                    data-cy="size-dropdown"
                    invalid={errors.boyut}
                    onChange={changeHandler}
                  />
                  Orta
                </Label>
              </FormGroup>
              <FormGroup check htmlFor="size-dropdown">
                <Label check>
                  <Input
                    type="radio"
                    name="boyut"
                    id="size-dropdown"
                    value="Küçük"
                    data-cy="size-dropdown"
                    invalid={errors.boyut}
                    onChange={changeHandler}
                  />
                  Büyük
                </Label>
              </FormGroup>
            </div>
            <FormGroup>
              <Label htmlFor="dough-dropdown" sm={2}>
                <h3>
                  Hamur Seç <span className="spacial-span">*</span>
                </h3>
              </Label>
              <Col sm={20}>
                <Input
                  id="dough-dropdown"
                  name="hamur"
                  type="select"
                  placeholder="---Hangi hamur olsun?---"
                  data-cy="dough-dropdown"
                  value={data.hamur}
                  onChange={changeHandler}
                >
                  <option value="ince">ince</option>
                  <option value="orta">orta</option>
                  <option value="kalın">kalın</option>
                </Input>
              </Col>
              <FormFeedback>{errors.hamur}</FormFeedback>
            </FormGroup>
          </div>

          <FormGroup>
            <h3>Ek Malzemeler:</h3>
            <p>En Fazla 10 malzeme seçebilirsiniz. 5tl</p>

            {secenekler.map((e, index) => {
              return (
                <div key={index}>
                  <FormGroup check inline>
                    <Input type="checkbox" name={e} onChange={check} />

                    <Label check>{e} </Label>
                    {/* <FormFeedback>{errors.secenekler}</FormFeedback> */}
                  </FormGroup>
                </div>
              );
            })}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="special-text">
              <h3>Sipariş Notu : </h3>
            </Label>
            <Input
              id="special-text"
              name="instructions"
              placeholder="notunuzu yazınız"
              type="text"
              data-cy="special-text"
              onChange={changeHandler}
              value={data.instructions}
              invalid={errors.instructions}
            />
            <FormFeedback>{errors.instructions}</FormFeedback>
          </FormGroup>

          <hr style={{ size: "2", border: "solid", width: "100%" }} />

          <div className="sayısal">
            <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={azalt}>-</Button>{" "}
                <Input id="count" type="number" value={counter} />{" "}
                <Button onClick={arttır}>+</Button>
              </ButtonGroup>
            </ButtonToolbar>

            <div className="seçim-2">
              <FormGroup>
                <Card
                  className="my-5"
                  style={{
                    width: "8rem",
                  }}
                >
                  <CardTitle>
                    {" "}
                    <h4 style={{ marginTop: 0 }}>Sipariş Toplamı</h4>
                  </CardTitle>
                  <CardText>
                    <h5>Seçimler: {ekücret * counter}TL </h5>

                    <h5>Toplam: {totalPrice} TL </h5>
                  </CardText>
                </Card>

                {disabled ? (
                  <button id="order-button" disabled={!disabled}>
                    Sipariş Verww
                  </button>
                ) : (
                  <Link to="/succes">
                    <button>Sipariş Ver</button>
                  </Link>
                )}
              </FormGroup>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiparisFormu;
