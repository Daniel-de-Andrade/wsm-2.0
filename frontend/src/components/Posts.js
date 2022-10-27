import React from "react";
// import "./style.css";

function Posts(datas) {
  return (
    <div className="container__users-table">
      <table className="table-striped users__table">
        <thead>
          <tr className="colunas">
            <th className="user__id" scope="col">
              ID
            </th>
            <th className="user__name" scope="col">
              Publicações
            </th>
            <th className="user__lastname" scope="col">
              Detalhes
            </th>
            <th className="user__email" scope="col">
              Adicionar
            </th>
            <th className="user__pass" scope="col">
              Editar
            </th>
            <th className="user__btn_view" scope="col">
              Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="colunas" key="" id="">
            <td className="user__id" data-title="ID" scope="row">
              id
            </td>
            <td className="user__name" data-title="Nome" scope="row">
              publicações
            </td>
            <td className="user__btn_view">
              <div className="btn-wrapper">
                <button className="btn-view" onClick={() => {}}>
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </td>
            <td className="user__email" data-title="Email" scope="row">
              adicionar
            </td>
            <td className="user__pass" data-title="Senha" scope="row">
              editar
            </td>
            <td className="user__pass" data-title="Senha" scope="row">
              excluir
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Posts;
