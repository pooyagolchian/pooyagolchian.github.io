---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Build poor mans VPN with SSH and Bitvise'
pubDate: '2020-05-31'
slug: 'ssh-tunnel'
description: 'When you have a server and you want to have a VPN on the server. You can use this method. The following concepts are required to install.'
cover: '/images/poor-man-vpn.webp'
coverAlt: 'Poor man VPN'
tags: ['Network', 'VPN', 'ShellScript']
---

When you have a server and you want to have a VPN on the server. You can use this method. The following concepts are required to install.

1. SSH
2. Software or CLI to tunnel all internet in your device

## Configure The Poor Man's VPN (Tunnel over SSH) on MacOS, Linux

1. Install and configuration proxychains4 (Next generation) from [github][1]
2. Befor this configuration, You must be install `gcc and make`

```bash
 ./configure --prefix=/usr --sysconfdir=/etc
  make
  [optional] sudo make install
  [optional] sudo make install-config (installs proxychains.conf)
```

1. Configure proxychanins4 from `/etc/proxychains.conf`
2. Comment Socks4 and add Socks5 like blow:

```bash
socks5 127.0.0.1 1080
```

5. You must be ssh to server like below(for Linux and MasOS):

```bash
ssh -f -N -D 1080 admin@server1.example.com
```

6. You can check the proxy like `curl -I twitter.com`
7. I'm wrote bash file to connect and disconnect to ssh in the MacOS. [Poor Man's vpn bash script][2]

```bash
#!/bin/sh
NET_SERVICE="Wi-Fi"
PORT=1080
SERVER=admin@server1.example.com
PID=`pgrep -f ${PORT}`
if [ "$EUID" -ne 0 ]
  then echo "Please run as root!"
  exit
fi
if pgrep -f ${PORT} >/dev/null
then
echo "WELCOME TO POOR MAN'S VPN"
echo "Ssh process in running with pid" $PID
kill -9 $PID
echo "Kill ssh process with PID" $PID
else
echo "Ssh process not found"
fi
ssh -D ${PORT} -f -C -q -N ${SERVER}
echo "Connect to server"
networksetup -setsocksfirewallproxy ${NET_SERVICE} 127.0.0.1 ${PORT}
networksetup -setsocksfirewallproxystate ${NET_SERVICE} on
PID=`pgrep -f ${PORT}`
echo "Ssh runs on PORT "${PORT}" and PID "${PID}". socks proxy set on Wi-Fi"
echo "For turn off socks5 proxy run command -> sudo kill -9 "${PID}"; networksetup -setsocksfirewallproxystate "${NET_SERVICE}" off"
echo "Change proxychain4 socks5 port sudo sed 's/foor/bar/g' /etc/proxychains.conf"
```

## Configure The Poor Man's VPN (Tunnel over SSH) on Windows 7,10

1. Install [Bitvise][3] and [Proxifier][4]
2. Follow image to install and configuration the SSH tunnel on the Windows

![Bitvise](/img/content/ssh-tunnel/ssh/1.jpg)

![Bitvise](/img/content/ssh-tunnel/ssh/2.jpg)

![Bitvise](/img/content/ssh-tunnel/ssh/3.jpg)

![Bitvise](/img/content/ssh-tunnel/ssh/4.jpg)

![Proxyfier](/img/content/ssh-tunnel/proxy/1.jpg)

![Proxyfier](/img/content/ssh-tunnel/proxy/2.jpg)

![Proxyfier](/img/content/ssh-tunnel/proxy/3.jpg)

![Proxyfier](/img/content/ssh-tunnel/proxy/4.jpg)

![Proxyfier](/img/content/ssh-tunnel/proxy/5.jpg)

[1]: https://github.com/rofl0r/proxychains-ng
[2]: https://gist.github.com/pooyagolchian/520ee77f22836d92b483f3f8827f8767
[3]: https://www.bitvise.com/ssh-client-download
[4]: http://www.mediafire.com/file/6fm9v97vnw6qj9y/ProxifierPE.zip/file
