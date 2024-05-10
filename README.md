### iced-americano-sugar-free

# Note:
1. gw masih bingung cara ngirim list of struct sebagai parameter dari frontend gimana, i don't know if that's even possible, jadi yg nambah cuma satu satu dulu aja
2. Not Accounting for race condition, but idk if thats possible lmao
3. probably student ga butuh id, pakai addresss aja. tapi udh terlanjur tulis. kl mau refactor tolong hapus student id dan pakai address aja buat keynya
4. bisakah degreenya dimint langsung ke address mahasiswa? tentu bisa. tapi ntar ga ada use case mahasiswa dong?
5. Kalau struct terlalu banyak properties, bakal ada error max call stack. jadi yg Student bbrp properties gw block dulu
6. Untuk student, walletnya bakal dibuat di frontend pakai ether js. Or idk... blom coba...

# command jalanin hardhat:
npm run compile: compiling solidity contract

npm run node: to create new local hardhat network. need for deploying

npm run visualize: visualize deployement graph

npm run dev: compile and deploy to local