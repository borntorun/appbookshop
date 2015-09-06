/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Publisher = require('./publisher.model.js');

count( function(err, num) {
  if ( err ) {return;}
  if (num === 0) {
    console.log('seeding publishers...');

    seed(function(err) {
      if ( err ) {return;}
      count(function(err, num) {
        if ( err ) {return;}
        console.log('publishers seeded: ', num);
      });
    });
  }
  console.log('publishers: ', num);
});

function count(callback) {
  Publisher.count({}, function( err, count ) {
    callback(err, count);
  });
}

function seed(callback) {
  Publisher.create(
    {"name": "A Bela e o Monstro Edições"},
    {"name": "A Esfera dos Livros"},
    {"name": "A. M. Pereira Editora"},
    {"name": "A. R. da Cruz Coutinho Editor"},
    {"name": "Abril/Controljornal Editora"},
    {"name": "Afrontamento"},
    {"name": "Alianza Editorial"},
    {"name": "Ambar"},
    {"name": "Amigos do Livro Editores"},
    {"name": "Âncora Editora"},
    {"name": "Asa Editores"},
    {"name": "Asa Editores, Público"},
    {"name": "Assírio & Alvim"},
    {"name": "Ática"},
    {"name": "Babel"},
    {"name": "Bertrand Editora"},
    {"name": "BIS"},
    {"name": "Brasília Editora"},
    {"name": "Caminho"},
    {"name": "Campo das Letras "},
    {"name": "CATEDRA - Letras Hispánicas"},
    {"name": "Centelha"},
    {"name": "Centro Atlântico"},
    {"name": "Círculo de Leitores"},
    {"name": "Círculo de Leitores e Temas e Debates"},
    {"name": "Civilização Editora"},
    {"name": "Colares Editora"},
    {"name": "Colecção Dois Mundos"},
    {"name": "Contexto Editora"},
    {"name": "Diário de Notícias"},
    {"name": "DIFEL"},
    {"name": "Difusão Cultural"},
    {"name": "Difusora Bíblica"},
    {"name": "Documentos Pontifícios"},
    {"name": "Edição de Autor"},
    {"name": "Ediciones Cátedra"},
    {"name": "Ediclube"},
    {"name": "Edições «O Jornal»"},
    {"name": "Edições 70"},
    {"name": "Edições Afrontamento"},
    {"name": "Edições ASA"},
    {"name": "Edições Avante"},
    {"name": "Edições Cosmos"},
    {"name": "Edições Cotovia, Lda "},
    {"name": "Edições Fernando Pereira"},
    {"name": "Edições Livros do Brasil"},
    {"name": "Edições Melhoramentos"},
    {"name": "Edições Nelson de Matos"},
    {"name": "Edições Romero"},
    {"name": "Edições Saída de Emergência"},
    {"name": "Éditions J.C. Lattès"},
    {"name": "Editora Arcádia"},
    {"name": "Editora Casa do Estudante do Brasil"},
    {"name": "Editora José Aguilar"},
    {"name": "Editora Objectiva"},
    {"name": "Editora Pergaminho"},
    {"name": "Editora Vozes"},
    {"name": "Editores Associados"},
    {"name": "Editores Unipessoal"},
    {"name": "Editorial Caminho"},
    {"name": "Editorial Comunicação"},
    {"name": "Editorial Estampa"},
    {"name": "Editorial Estúdios Cor"},
    {"name": "Editorial Ibis"},
    {"name": "Editorial Inova"},
    {"name": "Editorial Inquérito"},
    {"name": "Editorial Minerva"},
    {"name": "Editorial Missões"},
    {"name": "Editorial Presença"},
    {"name": "Editorial Século"},
    {"name": "Editorial Teorema"},
    {"name": "Editorial Teorema,Lda"},
    {"name": "Editorial Verbo"},
    {"name": "Esfera dos Livros"},
    {"name": "Estrela Editora"},
    {"name": "Estrofes & Versos"},
    {"name": "Estúdios Cor"},
    {"name": "Evoramons Editores"},
    {"name": "FCA - Editora de Informática"},
    {"name": "Fenda/Centelha"},
    {"name": "Gallimard"},
    {"name": "Global Notícias"},
    {"name": "Gradiva Publicações"},
    {"name": "Granito Editores e Livreiros"},
    {"name": "Guimarães Editores"},
    {"name": "J. Rodrigues & C.ª, Editores"},
    {"name": "Lavra & Oficina"},
    {"name": "Lello & Irmão Editores"},
    {"name": "LES ÉDITIONS DE MINUIT"},
    {"name": "Leya, SA"},
    {"name": "Livraria Bertrand"},
    {"name": "Livraria Clássica Editora"},
    {"name": "Livraria Martins Editora"},
    {"name": "Livraria Quadrante"},
    {"name": "Livraria Romano Torres"},
    {"name": "Livraria Tavares Martins"},
    {"name": "Livros Cotovia"},
    {"name": "Livros do Brasil"},
    {"name": "Martins Fontes, S. Paulo"},
    {"name": "Meribérica/Liber Editores"},
    {"name": "Moraes Editores"},
    {"name": "Morais Editora"},
    {"name": "O Oiro do Dia"},
    {"name": "Oficina do Livro"},
    {"name": "O'Reilly"},
    {"name": "Palavra"},
    {"name": "Parceria A.M. Pereira, Livraria Editora Lda"},
    {"name": "Parceria Livraria Aillaud e Bertrand"},
    {"name": "Perspetivas&Realidades"},
    {"name": "Planeta Editora"},
    {"name": "Plátano Editora"},
    {"name": "Porto Editora"},
    {"name": "Portugália Editora"},
    {"name": "Publicações D. Quixote/ Círculo de Leitores"},
    {"name": "Publicações Dom Quixote"},
    {"name": "Publicações Europa-América"},
    {"name": "Público "},
    {"name": "Público Comunicação Social"},
    {"name": "Quasi Edições"},
    {"name": "Quetzal Editores"},
    {"name": "Relógio D'Água"},
    {"name": "Relógio D'Água Editores"},
    {"name": "Revista Ocidente Edições"},
    {"name": "Seara Nova "},
    {"name": "Seara Nova / Editorial Comunicação"},
    {"name": "Sextante Editora"},
    {"name": "Sinais de Fogo"},
    {"name": "Sociedade de Expansão Cultural"},
    {"name": "Sociedases Bíblicas Unidas"},
    {"name": "Terramar Editores"},
    {"name": "Texto Editora"},
    {"name": "TINTA DA CHINA"},
    {"name": "Tinta Permanente"},
    {"name": "União das Cidades Capitais de Língua Portuguesa"},
    {"name": "União dos Escritores Angolanos/Edições 70"},
    {"name": "Vega"},
    {"name": "VitaminaBD"}
    ,callback
  );

}
