$('#cupcakes')
const MAIN_URL = '/api/cupcakes';

async function showCupcakes(){
    const res = await axios.get(MAIN_URL);
    const cupcakes = res.data.cupcakes;
    
    for (let cupcakeData of cupcakes){
        let newCupcake = $(cupcakeHTML(cupcakeData));
        $('#cupcakes').append(newCupcake);
    }
}

function cupcakeHTML(cupcake){
    return `
    <div data-cupcake-id=${cupcake.id} class="col-4 mx-2">
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
      </li>
      <img class="img-fluid"
            src="${cupcake.image}">
    </div>
    `;
}

$("#add-cupcake-form").on("submit", async function (e) {
    e.preventDefault();
  
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();
  
    const newCupcakeData = await axios.post(MAIN_URL, {
      flavor,
      rating,
      size,
      image
    });
  
    let newCupcake = $(cupcakeHTML(newCupcakeData.data.cupcake));
    $("#cupcakes").append(newCupcake);
    $("#add-cupcake-form").trigger("reset");
  });


showCupcakes()