import {
  CircularProgress,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import EditOutlined from "@material-ui/icons/EditOutlined";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DevelopersService } from "../../services";
import { DevelopersDto } from "../../types";
import { FormattedDateBR } from "../../utils/DateUtils";
import "./styles/developersList.css";

const DevelopersList: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>();
  const [developers, setDevelopers] = useState<DevelopersDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const history = useHistory();

  const doPagedSearch = useCallback(
    (search?: string) => {
      setLoading(true);
      const pagination = { page, size };
      DevelopersService.findAllPaginated(search ?? "", pagination)
        .then((response) => {
          setDevelopers(response.data.content);
          setTotalCount(response.data.totalCount);
        })
        .catch((error) =>
          alert(`Não foi possível encontrar nenhum desenvolvedor, ${error}`)
        )
        .finally(() => setLoading(false));
    },
    [page, size]
  );

  useEffect(() => {
    doPagedSearch();
  }, [doPagedSearch]);

  const onRemove = (id: string, index: number) => {
    setLoading(true);
    DevelopersService.remove(id)
      .then(() => {
        const newDevelopersList = [
          ...developers.slice(0, index),
          ...developers.slice(index + 1),
        ];
        setDevelopers(newDevelopersList);
        alert(`Desenvolvedor com id: ${id}, removido com sucesso!`);
      })
      .catch((error) =>
        alert(`Não foi possível remover o desenvolvedor, ${error}`)
      )
      .finally(() => setLoading(false));
  };

  const onEdit = (id?: string) => history.push(`/developers/${id}`);

  const onCreate = () => history.push("/developers/new");

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-panel">
      {loading ? (
        <div className="loading">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <div className="container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Sexo</TableCell>
                  <TableCell align="left">Idade</TableCell>
                  <TableCell align="left">Hobby</TableCell>
                  <TableCell align="left">Data de Nascimento</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {developers ? (
                  developers.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell align="left">{item.nome}</TableCell>
                      <TableCell align="left">{item.sexo}</TableCell>
                      <TableCell align="left">{item.idade}</TableCell>
                      <TableCell align="left">{item.hobby}</TableCell>
                      <TableCell align="left">
                        {FormattedDateBR(item.datanascimento)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          data-testid="editbutton-table"
                          onClick={() => onEdit(item._id!)}
                        >
                          <EditOutlined />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          data-testid="removebutton-table"
                          onClick={() => onRemove(item._id!, index)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell align="left">Sem registros</TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            className="pagination"
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={totalCount}
            labelRowsPerPage={"Exibir"}
            rowsPerPage={size}
            labelDisplayedRows={({ from, to, count }) =>
              `${from} - ${to} de ${count} `
            }
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Fab
            data-testid="floating-action-button"
            style={{
              margin: 0,
              top: "auto",
              right: 20,
              bottom: 20,
              left: "auto",
              position: "fixed",
            }}
            color="primary"
            className="floating-action-button"
            onClick={() => onCreate()}
          >
            <AddIcon />
          </Fab>
        </div>
      )}
    </div>
  );
};

export default DevelopersList;
