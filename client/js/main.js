

    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
    
      const signalhub = require('signalhub')
      const createSwarm = require('webrtc-swarm')
      const hub = signalhub('my-game', [
        'http://localhost:8080'
      ])
      const swarm = createSwarm(hub, {
        stream: stream
      })

      console.log(swarm, "swarm")
      console.log(hub, "hub")

      const Rapper = require('./rapper.js')





      





const rappers = {}


      const you = new Rapper()
      you.addStream(stream)
    
    
      swarm.on('connect', function (peer, id) {
        console.log(peer, "peer", id, "id")
        console.log(rappers[id], "rappers id")
        if (!rappers[id]) {
          rappers[id] = new Rapper()
          peer.on('data', function (data) {
            data = JSON.parse(data.toString())
            rappers[id].update(data)
          })
          rappers[id].addStream(peer.stream)
        }

      })
      console.log(rappers, "rappers")

      swarm.on('disconnect', function (peer, id) {
        if (rappers[id]) {
          rappers[id].element.parentNode.removeChild(rappers[id].element)
          delete rappers[id]
        }
      })
    
      
    































      setInterval(function () {
        you.update()
        const youString = JSON.stringify(you)
        swarm.peers.forEach(function (peer) {
          peer.send(youString)
        })
      }, 100)
    
      document.addEventListener('keypress', function (e) {
        const speed = 16
        switch (e.key) {
          case 'a':
            you.x -= speed
            break
          case 'd':
            you.x += speed
            break
          case 'w':
            you.y -= speed
            break
          case 's':
            you.y += speed
            break
        }
      }, false)
    
    })
    // }

    // createbattle()