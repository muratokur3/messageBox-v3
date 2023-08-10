setTimeout(() => {
  let btnWhatsapp = document.getElementById("btnOnlMsg");
  btnWhatsapp.style.visibility = "visible";
}, 1000);

const openMessageBox = () => {
  let messageBox = document.getElementById("messageBox");
  let btnOnlMsg = document.getElementById("btnOnlMsg");
  btnOnlMsg.style.visibility = "hidden";
  messageBox.style.visibility = "visible";
  document.getElementById("messageAlert").style.visibility = "hidden";
  messageCount = messages.length;
};

const openMessageBoxAdmin = () => {
  let messageBox = document.getElementById("messageBoxAdmin");
  let btnOnlMsg = document.getElementById("btnOnlMsgAdmin");
  btnOnlMsg.style.visibility = "hidden";
  messageBox.style.visibility = "visible";
};

const closeMessageBox = () => {
  document.getElementById("messageBox").style.visibility = "hidden";
  document.getElementById("btnOnlMsg").style.visibility = "visible";
  messageCount = messages.length;
};

const closeMessageBoxAdmin = () => {
  document.getElementById("messageBoxAdmin").style.visibility = "hidden";
  document.getElementById("btnOnlMsgAdmin").style.visibility = "visible";
};

let messages = [
  {
    userName: "Admin",
    messageText: "Merhaba size nasıl yardımcı olabilirim",
  },
  {
    userName: "Murat",
    messageText: "merhaba bir konu üzerinden bilgi almak istiyorum",
  },
  {
    userName: "Admin",
    messageText: "Tabi buyurun sizi dinliyorum",
  },
  {
    userName: "Murat",
    messageText: "bu kodları nasıl yazıyorsunuz?",
  },
  {
    userName: "Admin",
    messageText: "İzleyin ve görün",
  },
];

const messagess = (messages) => {
  messages.forEach((message) => {
    let messageLine = document.createElement("p");
    messageLine.classList = "messageLine";
    messageLine.innerText = message.messageText;

    if (message.userName == "Admin") {
      messageLine.style.alignSelf = "flex-start";
      messageLine.style.backgroundColor = "beige";
    } else {
      messageLine.style.alignSelf = "flex-end";
      messageLine.style.backgroundColor = "lightgreen";
    }

    document.getElementById("messageBoxContent").appendChild(messageLine);
  });
};

const messageBotResult = (message) => {
  message = message.toLowerCase();

  if (
    message.includes("merhaba") ||
    message.includes("selam") ||
    message.includes("günaydın") ||
    message.includes("selamunaleyküm") ||
    message.includes("yardım edin")
  ) {
    return "Merhaba! Size nasıl yardımcı olabilirim?";
  } else if (message.includes("ürünler")) {
    return "Mağazamızda elektronik, giyim, ev gereçleri gibi birçok kategoride ürün bulunmaktadır. Hangi kategoride arama yapmak istersiniz?";
  } else if (message.includes("elektronik")) {
    return "Elektronik kategorisinde telefonlar, dizüstü bilgisayarlar, kulaklıklar gibi ürünler bulabilirsiniz. Hangi ürünü arıyorsunuz?";
  } else if (message.includes("giyim")) {
    return "Giyim kategorisinde kadın, erkek ve çocuk giyim seçenekleri mevcut. Hangi cinsiyet için giyim ürünleri arıyorsunuz?";
  } else if (message.includes("ödeme") || message.includes("fiyat")) {
    return "Ürün fiyatları ve ödeme seçenekleri hakkında detaylı bilgiyi web sitemizde bulabilirsiniz. Kredi kartı ve havale gibi seçenekler sunuyoruz.";
  } else if (message.includes("kargo")) {
    return "Kargo süreleri genellikle siparişinizi verdikten sonra belirtilen süreler içinde gerçekleşir. Kargo ücreti değişkenlik gösterebilir.";
  } else if (message.includes("iade") || message.includes("iptal")) {
    return "Ürün iade ve iptal koşulları hakkında bilgi almak için müşteri hizmetlerimizle iletişime geçebilirsiniz. 14 gün içinde iade kabul edilmektedir.";
  } else if (message.includes("iletişim")) {
    return "Bizimle iletişime geçmek için iletişim sayfamızdaki iletişim bilgilerini kullanabilirsiniz. Ayrıca destek e-postamıza da yazabilirsiniz.";
  } else if (
    message.includes("teşekkür ederim") ||
    message.includes("hoşça kal")
  ) {
    return "Rica ederim, herhangi bir sorunuz olursa sormaktan çekinmeyin. İyi günler!";
  } else if (
    message.includes("destek") ||
    message.includes("canlı") ||
    message.includes("gerçek") ||
    message.includes("temsilci")
  ) {
    messages.push({
      userName: "Admin",
      messageText: "sizi destek birimine aktardım!",
    });
    support = true;
  } else {
    return "Üzgünüm, anlamadım. Daha spesifik bir soru sorsanız yardımcı olabilirim.";
  }
};

const messageResetAndWriting = () => {
  const messageboxcontentadmin = document.getElementById(
    "messageBoxContentAdmin"
  );
  const messageboxcontent = document.getElementById("messageBoxContent");
  messageboxcontent.innerHTML = "";
  document.getElementById("messageBoxContentAdmin").innerHTML = "";
  messagessAdmin(messages);
  messagess(messages);
  messageboxcontentadmin.scrollTop = messageboxcontentadmin.scrollHeight;
  messageboxcontent.scrollTop = messageboxcontent.scrollHeight;
};
let support = false;
const sendMessage = () => {
  let messageText = document.getElementById("txtMessage");
  if (messageText.value != "") {
    messages.push({ userName: "Murat", messageText: messageText.value });

    let result = messageBotResult(messageText.value);
    if (support != true) {
      messages.push({ userName: "Admin", messageText: result });
      messageText.value = "";
      messageResetAndWriting();
    } else {
      document.getElementById("messageBoxAdmin").style.visibility = "visible";
      messageText.value = "";
      messageResetAndWriting();
    }
  }
};

const sendMessageAdmin = () => {
  let messageTextAdmin = document.getElementById("txtMessageAdmin");

  if (messageTextAdmin.value != "") {
    const messageboxcontentadmin = document.getElementById(
      "messageBoxContentAdmin"
    );
    const messageboxcontent = document.getElementById("messageBoxConten");
    messages.push({ userName: "Admin", messageText: messageTextAdmin.value });
    if (
      document.getElementById("messageBox").style.visibility != "visible" &&
      messages.length > messageCount
    ) {
      document.getElementById("messageAlert").style.visibility = "visible";
      document.getElementById("messageAlert").innerHTML =
        messageTextAdmin.value;
    }
    messageResetAndWriting();
    messageTextAdmin.value = "";
    messageboxcontentadmin.scrollTop = messageboxcontentadmin.scrollHeight;
    messageboxcontent.scrollTop = messageboxcontent.scrollHeight;
  }
};

const messagessAdmin = (messages) => {
  messages.forEach((message) => {
    let messageLine = document.createElement("p");
    messageLine.classList = "messageLine";
    messageLine.innerText = message.messageText;

    if (message.userName != "Admin") {
      messageLine.style.alignSelf = "flex-start";
      messageLine.style.backgroundColor = "beige";
    } else {
      messageLine.style.alignSelf = "flex-end";
      messageLine.style.backgroundColor = "lightgreen";
    }

    document.getElementById("messageBoxContentAdmin").appendChild(messageLine);
  });
};

let messageCount = 4;
setInterval(() => {
  if (
    document.getElementById("messageBox").style.visibility != "visible" &&
    messages.length > messageCount
  ) {
    let messageAlert = document.getElementById("messageAlert");
    messageAlert.innerHTML = messages[messages.length - 1].messageText;
    if (messageAlert.style.visibility == "hidden") {
      messageAlert.style.visibility = "visible";
    } else messageAlert.style.visibility = "hidden";
  }
}, 5000);

messageResetAndWriting();

const textInput = document.getElementById("txtMessage");

textInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

const textInputAdmin = document.getElementById("txtMessageAdmin");

textInputAdmin.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    sendMessageAdmin();
  }
});
