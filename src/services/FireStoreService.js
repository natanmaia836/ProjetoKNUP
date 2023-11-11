import { MsgErro, MsgOcupado, MsgSucesso, MsgAtencao } from "/src/util/useMsg";
import {
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  setDoc,
  query,
  where,
} from "boot/firebase";
import { date } from "quasar";

export default function firestoreService() {
  const timeStamp = Date.now();
  const hoje = date.formatDate(timeStamp, "DD-MM-YYYY");
  const mes = date.formatDate(timeStamp, "MM-YYYY");

  const buscaTransacoesRealTime = async () => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, "transacoes", hoje);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        MsgOcupado(false);
        return docSnap.data();
      } else {
        MsgOcupado(false);
        MsgAtencao("Transações  não encontradas");
      }
    } catch (error) {
      console.log(error);
      MsgOcupado(false);
      MsgErro("Erro ao buscar transacoes teste!");
    }
  };
  const buscaGenericaPorIDRealTime = async (colecao, docID) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, colecao, docID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        MsgOcupado(false);
        return docSnap.data();
      }
    } catch (error) {
      console.log(error);
      MsgOcupado(false);
      MsgErro("Erro na busca genérica.");
    }
  };
  // Ex where("capital", "==", true));
  const buscaGenericaWhere = async (colecao, chave, condicao, valor) => {
    try {
      MsgOcupado(true);

      const lista = [];

      const q = query(collection(db, colecao), where(chave, condicao, valor));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        lista.push(doc.data());
        //console.log(doc.id, " => ", doc.data());
      });
      //
      MsgOcupado(false);
      return lista;
    } catch (error) {
      console.log(error);
      MsgOcupado(false);
      MsgErro("Erro na busca genérica.");
    }
  };
  const salvaGenericaSemID = async (colecao, form) => {
    try {
      MsgOcupado(true);
      const docRef = doc(collection(db, colecao));
      form.id = docRef.id;
      await setDoc(docRef, form);
      MsgOcupado(false);
      //console.log(docRef);
      return docRef;
    } catch (error) {
      console.log(error);
      MsgOcupado(false);
      MsgErro("Erro na salvamento generico sem ID.");
    }
  };
  const salvaGenericaComID = async (colecao, docID, form) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, colecao, docID);
      const retorno = await setDoc(docRef, form, { merge: true });
      MsgOcupado(false);
      return docRef.id;
    } catch (error) {
      console.log(error);
      MsgOcupado(false);
      MsgErro("Erro não identificado informe a administração SalvarGenerico");
    }
  };

  const buscarColecao = async (colecaoID) => {
    try {
      MsgOcupado(true);
      const colecaoRef = collection(db, colecaoID);
      const querySnapshot = await getDocs(colecaoRef);

      if (!querySnapshot.empty) {
        const dadosDaColecao = [];
        querySnapshot.forEach((doc) => {
          dadosDaColecao.push(doc.data());
        });
        MsgOcupado(false);
        return dadosDaColecao;
      } else {
        MsgOcupado(false);
        return null; // Ou lançar um erro, dependendo do seu caso de uso
      }
    } catch (error) {
      console.error(error);
      MsgOcupado(false);
      MsgErro("Erro na busca genérica.");
      throw error;
    }
  };
  const excluiDocumentoComID = async (colecao, docID) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, colecao, docID);

      await deleteDoc(docRef); // Use o método deleteDoc para excluir o documento

      MsgOcupado(false);
      return "Documento excluído com sucesso!";
    } catch (error) {
      console.error(error);
      MsgOcupado(false);
      MsgErro("Erro ao excluir o documento. Informe a administração.");
    }
  };
  const atualizarParametroDocumento = async (colecao, docID, parametro, novoValor) => {
    try {
      MsgOcupado(true);

      const docRef = doc(db, colecao, docID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Obtenha os dados atuais do documento
        const dadosAtuais = docSnap.data();

        // Verifique se o parâmetro existe no documento
        if (dadosAtuais[parametro] !== undefined) {
          // Atualize o valor do parâmetro
          dadosAtuais[parametro] = novoValor;

          // Atualize o documento no Firestore
          await setDoc(docRef, dadosAtuais);

          MsgOcupado(false);
          return { sucesso: true, mensagem: 'Parâmetro atualizado com sucesso.' };
        } else {
          MsgOcupado(false);
          return { sucesso: false, mensagem: 'O parâmetro especificado não existe no documento.' };
        }
      } else {
        MsgOcupado(false);
        return { sucesso: false, mensagem: 'Documento não encontrado.' };
      }
    } catch (error) {
      console.log(error);
      MsgErro("Erro na atualização do parâmetro do documento.");
      return { sucesso: false, mensagem: 'Erro na atualização do parâmetro do documento.' };
    } finally {
      MsgOcupado(false);
    }
  };
  return {
    buscaTransacoesRealTime,
    buscaGenericaPorIDRealTime,
    buscaGenericaWhere,
    salvaGenericaSemID,
    salvaGenericaComID,
    buscarColecao,
    excluiDocumentoComID,
    atualizarParametroDocumento,
  };
}
