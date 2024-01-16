import requests
import json

class SpotifyReac:
    def createPlaylist(header, name):
        useridurl = 'https://api.spotify.com/v1/me'
        response = requests.get(useridurl, headers=header)
        print(response)
        print(response.json())
        user_id = response.json()['id']
        url = f'https://api.spotify.com/v1/users/{user_id}/playlists'
        params = {
            'name': name,
            'public': True,
            'description': 'test'
        }
        res = requests.post(url, headers=header, json=params)
        print(res)

if __name__ == "__main__":
    tmp = SpotifyReac()
    tmp.AddSongToPlaylist()