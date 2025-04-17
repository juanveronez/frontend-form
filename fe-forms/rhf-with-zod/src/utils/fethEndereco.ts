export async function fethEndereco(
  cep: string,
  callback: (data: {
    logradouro: string;
    localidade: string;
    uf: string;
    bairro: string;
  }) => void
) {
  if (!cep) return;
  const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (response.ok) {
    callback(data);
  } else {
    throw new Error();
  }
}
