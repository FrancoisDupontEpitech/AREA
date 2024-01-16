import requests
import json

class GithubReac:
    def getListOrganizations(self, headers):
        url = 'https://api.github.com/user/orgs'
        response = requests.get(url, headers=headers)
        for i in range(0, len(response.json())):
            print(response.json()[i]['login'])

    def getListCommit(self, org, repo, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/commits'
        response = requests.get(url, headers=headers)
        for i in range(0, len(response.json())):
            print(response.json()[i]['commit']['author']['date'])
            print(response.json()[i]['commit']['message'])
            print(response.json()[i]['commit']['author']['name'])

    def getListCollaborators(self, org, repo, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators'
        response = requests.get(url, headers=headers)
        for i in range(0, len(response.json())):
            print(response.json()[i]['login'])
            print(response.json()[i]['role_name'])

    def deleteACollaborator(self, org, repo, headers, user, perms):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators/{user}'
        params = {
            'permission': perms
        }
        response = requests.delete(url, headers=headers, params=params)
        print(response)

    def addACollaborator(self, org, repo, headers, user):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators/{user}'
        response = requests.put(url, headers=headers)
        print(response.json())

if __name__ == "__main__":
    org = 'TestAreaEpitech'
    repo = 'TestRepoArea'
    BearerToken = 'Bearer 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'
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': BearerToken,
        'X-GitHub-Api-Version': '2022-11-28'
    }
    user = 'NathanWarinTest'
    perms = 'admin'
    tmp = GithubReac()
    tmp.getListCollaborators(org, repo, headers)
    #getListCollaborators(org, repo, headers)
    #getListCommit(org, repo, headers)
    #getListOrganizations(headers)
    #addACollaborator(org, repo, headers, user)
    #deleteACollaborator(org, repo, headers, user, perms)