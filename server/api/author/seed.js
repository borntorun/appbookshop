/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Author = require('./author.model.js');

count( function(err, num) {
  if ( err ) {return;}
  if (num === 0) {
    console.log('seeding authors...');

    seed(function(err) {
      if ( err ) {return;}
      count(function(err, num) {
        if ( err ) {return;}
        console.log('authors seeded: ', num);
      });
    });
  }
  console.log('authors: ', num);
});

function count(callback) {
  Author.count({}, function( err, count ) {
    callback(err, count);
  });
}

function seed(callback) {
  Author.create(
    {'name': 'A. Birou'},
    {'name': 'Agatha Christie'},
    {'name': 'Agostinho da Silva'},
    {'name': 'Agostinho Neto'},
    {'name': 'Aguinaldo Fonseca'},
    {'name': 'Al Berto'},
    {'name': 'Alain de Botton'},
    {'name': 'Albert Camus'},
    {'name': 'Alberto Moravia'},
    {'name': 'Alberto Silva'},
    {'name': 'Albino Fernandes de Sá'},
    {'name': 'Aldous Huxley'},
    {'name': 'Alex Gozblau'},
    {'name': 'Alexander S. Pushkin'},
    {'name': 'Alexandre Dáskalos'},
    {'name': 'Alexandre Dumas'},
    {'name': 'Alexandre Herculano'},
    {'name': 'Alexandre O\'Neil'},
    {'name': 'Alfonso Milagro'},
    {'name': 'Alfredo Margarido'},
    {'name': 'Alfredo Osório'},
    {'name': 'Alice Munro'},
    {'name': 'Almeida Garrett'},
    {'name': 'Álvaro Ribeiro'},
    {'name': 'Alves Redol'},
    {'name': 'Amadeu Quintas da Graça'},
    {'name': 'Amin Maalouf'},
    {'name': 'Amos Oz'},
    {'name': 'Ana Jorge'},
    {'name': 'Ana Lídia Pinto'},
    {'name': 'Ana Teresa Silva'},
    {'name': 'Anatole France'},
    {'name': 'Anatoli Ribakov'},
    {'name': 'André Malraux'},
    {'name': 'Antoine de Saint-Exupéry'},
    {'name': 'Anton Tchkhov'},
    {'name': 'Antoni Tabucchi'},
    {'name': 'António Alçada Baptista'},
    {'name': 'António Botto'},
    {'name': 'António Cardoso'},
    {'name': 'António Jacinto'},
    {'name': 'António Lobo Antunes'},
    {'name': 'António Machado'},
    {'name': 'Antonio Muñoz Molina'},
    {'name': 'António Nobre'},
    {'name': 'António Ramos Rosa'},
    {'name': 'António Ruivo'},
    {'name': 'António Sarabia'},
    {'name': 'António Sérgio'},
    {'name': 'António Valdemar'},
    {'name': 'Arnaldo Santos'},
    {'name': 'Arundhati Roy'},
    {'name': 'atrb. Mariana Alcoforado'},
    {'name': 'Augusto Gil'},
    {'name': 'Beatrix Heintze'},
    {'name': 'Ben Albahari'},
    {'name': 'Bernard Michal'},
    {'name': 'Bernardim Ribeiro'},
    {'name': 'Bernardo Atxaga'},
    {'name': 'Bertrand Barinque'},
    {'name': 'Binet'},
    {'name': 'Bocage'},
    {'name': 'Bourgeon'},
    {'name': 'Brian O\'Leary'},
    {'name': 'Bruce Chatwin'},
    {'name': 'Bruce Springsteen'},
    {'name': 'Camilo Castelo Branco'},
    {'name': 'Camilo Pessanha'},
    {'name': 'Carlos de Oliveira'},
    {'name': 'Carlos Drummond de Andrade'},
    {'name': 'Carlos Ervedosa'},
    {'name': 'Carlos Guerreiro'},
    {'name': 'Carlos Videira'},
    {'name': 'Caroline Toutain'},
    {'name': 'Carson McCullers'},
    {'name': 'Castro Soromenho'},
    {'name': 'Célia Pinto Couto'},
    {'name': 'Charles Dickens'},
    {'name': 'Chico Buarque'},
    {'name': 'Clara Rocha'},
    {'name': 'Clarice Lispector'},
    {'name': 'Conceição Soeiro'},
    {'name': 'Costa Andrade'},
    {'name': 'Cristina Almeida Ribeiro'},
    {'name': 'Cristina Cordeiro'},
    {'name': 'D. Francisco Manuel de Mélo'},
    {'name': 'D. Miguel Henrique de Menezes Alarcão'},
    {'name': 'Daniel Mordzinski'},
    {'name': 'Daniil Harms'},
    {'name': 'David Mourão-Ferreira'},
    {'name': 'Denis Diderot'},
    {'name': 'Dennis Potter'},
    {'name': 'Deszo Kosztolányi'},
    {'name': 'Dethorey'},
    {'name': 'Dr. Benjamin Spock'},
    {'name': 'Dr. Charles Goldrach'},
    {'name': 'Dr. Lionel Gendron'},
    {'name': 'Dr. Serge Mongeau'},
    {'name': 'Dulce Maria Cardoso'},
    {'name': 'Dylan Thomas'},
    {'name': 'E.E. Cummings'},
    {'name': 'E.H. Gombrich'},
    {'name': 'Eça de Queirós'},
    {'name': 'Edgar Allan Poe'},
    {'name': 'Edgar P. Jacobs'},
    {'name': 'Eduardo Lourenço'},
    {'name': 'Elin Hilderbrand'},
    {'name': 'Ellery Queen'},
    {'name': 'Emílio Salgari'},
    {'name': 'Emílio Zola'},
    {'name': 'Emmanuelle Grundman'},
    {'name': 'Enki Bilal'},
    {'name': 'Erasmo de Roterdão'},
    {'name': 'Erico Veríssimo'},
    {'name': 'Ernest Hemingway'},
    {'name': 'Erwin Fieger'},
    {'name': 'Eugénio Lisboa'},
    {'name': 'Evelyn Waugh'},
    {'name': 'F. Scott Fitzgerald'},
    {'name': 'Fátima Freitas Morna'},
    {'name': 'Federico García Lorca'},
    {'name': 'Fernando Assis Pacheco'},
    {'name': 'Fernando de Paços'},
    {'name': 'Fernando Echevarría'},
    {'name': 'Fernando Garcia'},
    {'name': 'Fernando Guimarães'},
    {'name': 'Fernando Namora'},
    {'name': 'Fernando Pessoa'},
    {'name': 'Fernando Rosas'},
    {'name': 'Fernando V. Peixoto da Fonseca'},
    {'name': 'Ferreira de Castro'},
    {'name': 'Fiodor Dostoievski'},
    {'name': 'Florbela Espanca'},
    {'name': 'Francisco José Viegas'},
    {'name': 'Francisco Louçã'},
    {'name': 'François Bourgeon'},
    {'name': 'Françoise Dolto'},
    {'name': 'Frank Giroud'},
    {'name': 'Frank Zappa'},
    {'name': 'Franz Kafka'},
    {'name': 'Frederico Lourenço'},
    {'name': 'Frei Romano Zago'},
    {'name': 'Friedrich Dürrenmatt'},
    {'name': 'Gabriel García Márquez'},
    {'name': 'Gao Xingjian'},
    {'name': 'Gémeos'},
    {'name': 'George Orwell'},
    {'name': 'Gerhard Leibold'},
    {'name': 'Giroud'},
    {'name': 'Giulio De Vita'},
    {'name': 'Godard'},
    {'name': 'Gonçalo M. Tavares'},
    {'name': 'Gonzaga Lambo'},
    {'name': 'Gordon Childe'},
    {'name': 'Graça Morais'},
    {'name': 'Graciliano Ramos'},
    {'name': 'Graham Greene'},
    {'name': 'Guerra Junqueiro'},
    {'name': 'Guilherme de Castilho'},
    {'name': 'Helena Barradas'},
    {'name': 'Hélia Correia'},
    {'name': 'Heman Melville'},
    {'name': 'Henrique Abranches'},
    {'name': 'Henrique Guerra'},
    {'name': 'Henrique O\'Neill'},
    {'name': 'Herman Hesse'},
    {'name': 'Hernâni Cidade'},
    {'name': 'Herta Müller'},
    {'name': 'Homero'},
    {'name': 'I. Ambrosia'},
    {'name': 'Ievtuchenko'},
    {'name': 'Ignacio Medina'},
    {'name': 'Ingo F. Walther'},
    {'name': 'Inocência Mata'},
    {'name': 'Irvin D. Yalom'},
    {'name': 'Irwin Shaw'},
    {'name': 'Isabel Oliveira'},
    {'name': 'Isabel Robin de Andrade'},
    {'name': 'Isabelle Ramade-Masson'},
    {'name': 'Isidore Ducasse'},
    {'name': 'Iza Salles'},
    {'name': 'J. Ferreira Fontes'},
    {'name': 'J. R. R. Tolkien'},
    {'name': 'J. W. Goethe'},
    {'name': 'J.-C. Mézières'},
    {'name': 'J.D.Salinger'},
    {'name': 'Jack Kerouac'},
    {'name': 'Jacob e Wilhelm Grimm'},
    {'name': 'Jacques Prévert'},
    {'name': 'James Joyce'},
    {'name': 'Janice VanCleave'},
    {'name': 'Jean-Arthur Rimbaud'},
    {'name': 'Jim Morrison'},
    {'name': 'Jimmy Liao'},
    {'name': 'João de Melo'},
    {'name': 'João Dias'},
    {'name': 'João dos Santos'},
    {'name': 'João Maia'},
    {'name': 'João Miguel Fernandes Jorge'},
    {'name': 'João Miguel Figueiredo Silva'},
    {'name': 'João Pedro Mésseder'},
    {'name': 'João XXIII'},
    {'name': 'Joaquim Manuel Magalhães'},
    {'name': 'Joaquina Prazeres'},
    {'name': 'Joca Reiners Terron'},
    {'name': 'John Dos Passos'},
    {'name': 'John Galsworthy'},
    {'name': 'John Gray'},
    {'name': 'John Le Carré'},
    {'name': 'John Lennon'},
    {'name': 'John Steinbeck'},
    {'name': 'Jorge Amado'},
    {'name': 'Jorge de Sena'},
    {'name': 'Jorge M. Martins'},
    {'name': 'José Bento'},
    {'name': 'José Cardoso Pires'},
    {'name': 'José Carlos Ary dos Santos'},
    {'name': 'José Craveirinha'},
    {'name': 'José Eduardo Agualusa'},
    {'name': 'José Gil'},
    {'name': 'José Jorge Letria'},
    {'name': 'José Luandino Vieira'},
    {'name': 'José Luís Peixoto'},
    {'name': 'José Manuel Fajardo'},
    {'name': 'José Manuel Gonçalves'},
    {'name': 'José Maria Mendiluce'},
    {'name': 'José Mauro de Vasconcelos'},
    {'name': 'José Paulo Cavalcanti Filho'},
    {'name': 'José Régio'},
    {'name': 'José Rodrigues Miguéis'},
    {'name': 'José Saramago'},
    {'name': 'José Tolentino Mendonça'},
    {'name': 'José Viale Moutinho'},
    {'name': 'Joseph Béhé'},
    {'name': 'Juan Rulfo'},
    {'name': 'Julian Barnes'},
    {'name': 'Júlio Dinis'},
    {'name': 'Júlio Verne'},
    {'name': 'Katherine Mansfield'},
    {'name': 'Katsuhiro Otomo'},
    {'name': 'Kevin Major'},
    {'name': 'Lacroix'},
    {'name': 'Laura Esquível'},
    {'name': 'Laurinda Rodrigues'},
    {'name': 'Leão Tolstoi'},
    {'name': 'Leão XIII'},
    {'name': 'Leonard Cohen'},
    {'name': 'Leonor Batalha Santos'},
    {'name': 'Leonor Teixeira'},
    {'name': 'Li Shang-Yin'},
    {'name': 'Lídia Jorge'},
    {'name': 'Luandino Vieira'},
    {'name': 'Luis de Camões'},
    {'name': 'Luís de Sttau Monteiro'},
    {'name': 'Luís Miguel Naiva'},
    {'name': 'Luís Sepúlveda'},
    {'name': 'Luiza Neto Jorge'},
    {'name': 'Lyman Frank Baum'},
    {'name': 'M. Cerqueira Correia'},
    {'name': 'M. Engrácia Domingos'},
    {'name': 'Machado de Assis'},
    {'name': 'Madalena Garcia'},
    {'name': 'Mafalda Ivo Cruz'},
    {'name': 'Maiakowski'},
    {'name': 'Manuel Alegre'},
    {'name': 'Manuel Bandeira'},
    {'name': 'Manuel Cintra'},
    {'name': 'Manuel da Fonseca'},
    {'name': 'Manuel Lima'},
    {'name': 'Manuel Paquete'},
    {'name': 'Manuel Pedro Pacavira'},
    {'name': 'Marcel Proust'},
    {'name': 'Margaret Mitchell'},
    {'name': 'Margarida Barahona'},
    {'name': 'Marguerie Duras'},
    {'name': 'Maria Adelaide Couto Viana'},
    {'name': 'Maria da Conceição Nobre'},
    {'name': 'Maria da Graça Videira Lopes'},
    {'name': 'Maria de Belém Roseira'},
    {'name': 'Maria Ema Tarracha Ferreira'},
    {'name': 'Maria Isabel de Mendonça Soares'},
    {'name': 'María Jesús Álava Reyes'},
    {'name': 'Maria Selene Santos'},
    {'name': 'Mariana Mortágua'},
    {'name': 'Mário António'},
    {'name': 'Mário Cláudio'},
    {'name': 'Mario Vargas Ilosa'},
    {'name': 'Marion Zimmer Bradley'},
    {'name': 'Marvano'},
    {'name': 'Massimiliano Frezzato'},
    {'name': 'Mauro Nunes'},
    {'name': 'Máximo Gorki'},
    {'name': 'Melissa Fay Greene'},
    {'name': 'Mercè Rodoreda'},
    {'name': 'Mia Couto'},
    {'name': 'Michael Morrison'},
    {'name': 'Miguel de Cervantes'},
    {'name': 'Miguel de Unamuno'},
    {'name': 'Miguel Esteves Cardoso'},
    {'name': 'Miguel Torga'},
    {'name': 'Milan Kundera'},
    {'name': 'Milo Manara'},
    {'name': 'Milton'},
    {'name': 'Montserrat Roig'},
    {'name': 'Morris West'},
    {'name': 'Nadine Gordimer'},
    {'name': 'Natália Correia'},
    {'name': 'Neil Gaiman'},
    {'name': 'Nikolai Gógol'},
    {'name': 'Noam Chomsky'},
    {'name': 'Nuno Júdice'},
    {'name': 'Nuno Markl'},
    {'name': 'Ondjaki'},
    {'name': 'Onésimo Silveira'},
    {'name': 'Orlando da Costa'},
    {'name': 'Oscar Wilde'},
    {'name': 'Ossip Mandelstam'},
    {'name': 'Osvaldo de Sousa'},
    {'name': 'Ovídio Martins'},
    {'name': 'P. Christin'},
    {'name': 'Pablo Neruda'},
    {'name': 'Padre António Vieira'},
    {'name': 'Pascal Croci'},
    {'name': 'Patrick Modiano'},
    {'name': 'Paul Auster'},
    {'name': 'Paul Bowles'},
    {'name': 'Paul Éluard'},
    {'name': 'Paul Hazard'},
    {'name': 'Pedro Almiro Neves'},
    {'name': 'Pedro Ramos'},
    {'name': 'Pepetela'},
    {'name': 'Peter Drayton'},
    {'name': 'Peter Handke'},
    {'name': 'Pierre Christin'},
    {'name': 'Pierre Valinieff'},
    {'name': 'Pio XI'},
    {'name': 'Pires Laranjeira'},
    {'name': 'Plantu'},
    {'name': 'Rafael Alberti'},
    {'name': 'Rainer Maria Rilke'},
    {'name': 'Raymond Carver'},
    {'name': 'Ricardo Alberti'},
    {'name': 'Ricardo Miguel Gomes'},
    {'name': 'Ricardo Reis'},
    {'name': 'Ricardo Simões Ferreira'},
    {'name': 'Richard Templar'},
    {'name': 'Rita Ferro'},
    {'name': 'Robert Louis Stevenson'},
    {'name': 'Robert Lowell'},
    {'name': 'Rodrigues Lapa'},
    {'name': 'Roger Martin Du Gard'},
    {'name': 'Romain Rolland'},
    {'name': 'Romaine Moreton'},
    {'name': 'Rómulo de Carvalho'},
    {'name': 'Rubem Fonseca'},
    {'name': 'Rubén Darío'},
    {'name': 'Rui Tavares'},
    {'name': 'Rui Vieira'},
    {'name': 'Rui Zink'},
    {'name': 'Ruy Belo'},
    {'name': 'Saira Shah'},
    {'name': 'Salman Rushdie'},
    {'name': 'Sam Shepard'},
    {'name': 'Santiago Gamboa'},
    {'name': 'Scott Klein'},
    {'name': 'Sérgio Godinho'},
    {'name': 'Simenon'},
    {'name': 'Simon and Garfunkel'},
    {'name': 'Simone de Beauvoir'},
    {'name': 'Sir Arthur Conan Doyle'},
    {'name': 'Sir Martin Brofman'},
    {'name': 'Soeiro Pereira Gomes'},
    {'name': 'Somerset Maugham'},
    {'name': 'Somerset Maughan'},
    {'name': 'Sophia de Mello Breyner Andersen'},
    {'name': 'Sóror Mariana'},
    {'name': 'Stephane Mallarme'},
    {'name': 'Susan Elizabeth George'},
    {'name': 'Sylvia Plath'},
    {'name': 'Takumi Nagayasu'},
    {'name': 'Ted Neward'},
    {'name': 'Télio T. Fernandes'},
    {'name': 'Teófilo Braga'},
    {'name': 'Teolinda Gersão'},
    {'name': 'Teresa de Rita Oliveira Dias'},
    {'name': 'Teresa Marques'},
    {'name': 'Teresa Tavares'},
    {'name': 'Thom Hartmann'},
    {'name': 'Thomas Mann'},
    {'name': 'Thomas Stearns Eliot'},
    {'name': 'Tim Hindle'},
    {'name': 'Tomás Morus'},
    {'name': 'Tomas Tranströmer'},
    {'name': 'Tomaz Vieira da Cruz'},
    {'name': 'Truman Capote'},
    {'name': 'Valter Hugo Mãe'},
    {'name': 'Vários'},
    {'name': 'Vercors'},
    {'name': 'Vergílio Ferreira'},
    {'name': 'Vinicius de Moraes'},
    {'name': 'Virgílio'},
    {'name': 'Viriato Cruz'},
    {'name': 'Vitorino Nemésio'},
    {'name': 'W. Somerset Maugham'},
    {'name': 'W. Somerset Maughan'},
    {'name': 'Walt Whitman'},
    {'name': 'Washington Irving'},
    {'name': 'Will Eisner'},
    {'name': 'William Blake'},
    {'name': 'William Faulkner'},
    {'name': 'William Shakespeare'},
    {'name': 'Xanana Gusmão'},
    {'name': 'Xenofonte'},
    {'name': 'Yvon Le Bot'},
    callback
  );
}