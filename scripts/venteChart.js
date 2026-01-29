class VenteChart {
  static render(data) {
    console.log(data);
    let benefice = [];
    let days = [];
    let vente = [];
    for (let item of data) {
      benefice.push(item.benefice);
      vente.push(item.totalMoney);
      days.push(item.day);
    }
    let ctx = document.querySelector("#chart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Benefice",
            data: benefice,
            type: "line",
            borderColor: ["#1CB060"],
            backgroundColor: ["#147B44"],
            borderWidth: 2,
          },
          {
            label: "Vente",
            data: vente,
            backgroundColor: ["#8EC958"],
            borderColor: ["#D2E124"],
            borderWidth: 2,
          },
        ],
        labels: days,
      },
    });
  }
}
