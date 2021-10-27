chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "cpf-paste",
    title: "CPF",
    contexts: ["editable"],
  });

  chrome.contextMenus.create({
    id: "cnpj-paste",
    title: "CNPJ",
    contexts: ["editable"],
  });

  chrome.contextMenus.create({
    id: "separator-1",
    type: "separator",
    contexts: ["editable"],
  });

  chrome.contextMenus.create({
    id: "cpf-paste-mask",
    title: "CPF with Mask",
    contexts: ["editable"],
    type: "normal",
  });

  chrome.contextMenus.create({
    id: "cnpj-paste-mask",
    title: "CNPJ with Mask",
    contexts: ["editable"],
  });
});

function showCpf(mask) {
  let documentCpf = "";

  let create_array = (total, numero) =>
    Array.from(Array(total), () => number_random(numero));
  let number_random = (number) => Math.round(Math.random() * number);
  let mod = (dividendo, divisor) =>
    Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);

  let total_array = 9;
  let n = 9;
  let [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(total_array, n);

  let d1 =
    n9 * 2 +
    n8 * 3 +
    n7 * 4 +
    n6 * 5 +
    n5 * 6 +
    n4 * 7 +
    n3 * 8 +
    n2 * 9 +
    n1 * 10;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n9 * 3 +
    n8 * 4 +
    n7 * 5 +
    n6 * 6 +
    n5 * 7 +
    n4 * 8 +
    n3 * 9 +
    n2 * 10 +
    n1 * 11;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  if (mask) {
    documentCpf = `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
  } else {
    documentCpf = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
  }

  document.activeElement.value = documentCpf;
}

function showCnpj(mask) {
  let documentCpf = "";

  let create_array = (total, numero) =>
    Array.from(Array(total), () => number_random(numero));
  let number_random = (number) => Math.round(Math.random() * number);
  let mod = (dividendo, divisor) =>
    Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);

  let total_array = 8;
  let n = 9;
  let [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n);
  let n9 = 0;
  let n10 = 0;
  let n11 = 0;
  let n12 = 1;

  let d1 =
    n12 * 2 +
    n11 * 3 +
    n10 * 4 +
    n9 * 5 +
    n8 * 6 +
    n7 * 7 +
    n6 * 8 +
    n5 * 9 +
    n4 * 2 +
    n3 * 3 +
    n2 * 4 +
    n1 * 5;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n12 * 3 +
    n11 * 4 +
    n10 * 5 +
    n9 * 6 +
    n8 * 7 +
    n7 * 8 +
    n6 * 9 +
    n5 * 2 +
    n4 * 3 +
    n3 * 4 +
    n2 * 5 +
    n1 * 6;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  if (mask) {
    documentCpf = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
  } else {
    documentCpf = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
  }

  document.activeElement.value = documentCpf;
}

chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  chrome.tabs.query({ active: true }, function (tabs) {
    let tabId = tabs[0].id;

    if (clickData.menuItemId === "cpf-paste-mask") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: showCpf,
        args: [true],
      });
    } else if (clickData.menuItemId === "cpf-paste") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: showCpf,
        args: [false],
      });
    } else if (clickData.menuItemId === "cnpj-paste") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: showCnpj,
        args: [false],
      });
    } else if (clickData.menuItemId === "cnpj-paste-mask") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: showCnpj,
        args: [true],
      });
    }
  });
});
