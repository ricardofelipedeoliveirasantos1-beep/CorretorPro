const fs = require('fs');

let code = fs.readFileSync('src/mocks/mockProperties.ts', 'utf8');
code = code.replace(/'Em negociação'/g, "'Negociando'");
code = code.replace(/'Alugado'/g, "'Vendido'");
code = code.replace(/'Reservado'/g, "'Indisponível'");
code = code.replace(/'Inativo'/g, "'Indisponível'");
fs.writeFileSync('src/mocks/mockProperties.ts', code);

let codeList = fs.readFileSync('src/pages/admin/properties/PropertiesList.tsx', 'utf8');
codeList = codeList.replace(/<option value="Reservado">Reservado<\/option>/g, '');
codeList = codeList.replace(/<option value="Em negociação">Em negociação<\/option>/g, '<option value="Negociando">Negociando</option>');
codeList = codeList.replace(/<option value="Alugado">Alugado<\/option>/g, '<option value="Indisponível">Indisponível</option>');
codeList = codeList.replace(/p => p.status === 'Em negociação'/g, "p => p.status === 'Negociando'");
fs.writeFileSync('src/pages/admin/properties/PropertiesList.tsx', codeList);
