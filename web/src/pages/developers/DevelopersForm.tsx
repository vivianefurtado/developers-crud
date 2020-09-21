import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { DevelopersService } from "../../services";
import {
  InputLabel,
  TextField,
  CircularProgress,
  Button,
  Select,
  FormControl,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { DevelopersDto } from "../../types/Developers";
import "./styles/developersForm.css";
import { FormattedDate } from "../../utils/DateUtils";

const initialValues = {
  _id: undefined,
  nome: "",
  idade: 0,
  sexo: "masculino",
  hobby: "",
  datanascimento: new Date().toString(),
};

const DevelopersForm: React.FC<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [developer, setDeveloper] = useState<DevelopersDto>();

  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      DevelopersService.findById(id)
        .then((response) => setDeveloper(response.data))
        .catch((error) =>
          alert(`Não foi possível encontrar o desenvolvedor com id: ${id}.`)
        )
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = (values: DevelopersDto) => {
    setLoading(true);
    DevelopersService.save(values)
      .then(() => {
        alert(`Desenvolvedor cadastrado com sucesso!`);
        history.replace("/developers");
      })
      .catch((error) =>
        alert(`Não foi possível salvar o cadastro do desenvolvedor, ${error}`)
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <Formik<DevelopersDto>
          initialValues={developer ?? initialValues}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form className="form-container">
              <FormControl
                style={{
                  display: "flex",
                }}
              >
                <TextField
                  data-testid="name-input"
                  style={{ width: "500px" }}
                  label="Nome"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <FormControl style={{ width: "500px" }}>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    native
                    name="sexo"
                    label="Sexo"
                    value={values.sexo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </Select>
                </FormControl>

                <TextField
                  style={{ width: "500px" }}
                  type="number"
                  label="Idade"
                  name="idade"
                  value={values.idade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  type="date"
                  style={{ width: "500px" }}
                  name="datanascimento"
                  value={FormattedDate(values.datanascimento)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  style={{ width: "500px" }}
                  label="Hobby"
                  name="hobby"
                  value={values.hobby}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="button-submit">
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Salvar
                  </Button>
                </div>
              </FormControl>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DevelopersForm;
