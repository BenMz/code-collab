'use strict'

var socketIO = require('socket.io');
var ot = require('ot')
const Session = require('./models/Session');
var channelList = {};

module.exports = function(server){
	var str = 'This is a test \n\n ' + ' //Abort abort ';
	var io = socketIO(server);
	io.on('connection', function(socket){
		socket.on('joinChannel', function(data){
			if(!channelList[data.channel]){
				var socketIOServer = new ot.EditorSocketIOServer(str, [], data.channel, function(socket, cb){
					var self = this;
					Session.findByIdAndUpdate(data.channel, {content: self.document}, function(err){
						if(err) {
							return cb(false);
						}
						cb(true);
					});
				});
				channelList[data.channel] = socketIOServer;
			}
			channelList[data.channel].addClient(socket);
			channelList[data.channel].setName(socket, data.username);
			socket.channel = data.channel;
			socket.join(data.channel)
		})
		socket.on('chatMessage', function(data){
			io.to(socket.channel).emit('chatMessage', data);
		});
		socket.on('endStream', function(data){
			io.to(socket.channel).emit('endStream', data);
		});
		socket.on('disconnect', function(data){
			socket.leave(socket.channel);
		});
	});
}