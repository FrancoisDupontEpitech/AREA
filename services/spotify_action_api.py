import requests
import json
import time

class SpotifyAc:
    def NewPlaylistCreated(header):
        url = 'https://api.spotify.com/v1/me/playlists'
        response = requests.get(url, headers=header)
        length = response.json()['total']
        print(response)
        while True:
            time.sleep(5)
            res = requests.get(url, headers=header)
            print(res)
            total = res.json()['total']
            if (length < total):
                print('Playlist has been created')
                response = res
                length = total

    def SongAddedToPlaylist(self):
        response = requests.get('https://api.spotify.com/v1/me/playlists', headers=headers)

if __name__ == "__main__":
    base_url = 'https://accounts.spotify.com/api/token'
    params = {
        'grant_type': 'client_credentials',
        'client_id': '1d3ce8c346ce49178fcaf53483366483',
        'client_secret': 'cf2341d8f100446dad2c75da5c6274dd'
    }
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.post(base_url, params=params, headers=headers)
    access_token = response.json()['access_token']
    header = {
        'Authorization': f'Bearer {access_token}'
    }
    #NewArtistFollow()
    tmp = SpotifyAc()
    tmp.NewPlaylistCreated(header)
    #SongAddedToPlaylist()