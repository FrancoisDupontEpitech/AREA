import requests
import json
import time

class GithubAc:
    def NewCommit(self, repo, org, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/commits'
        response = requests.get(url, headers=headers)
        dataToCompare = response.json()[0]['sha']
        while True:
            time.sleep(20)
            res = requests.get(url, headers=headers)
            actualData = res.json()[0]['sha']
            message = res.json()
            if (actualData != dataToCompare):
                print('new commit:')
                print(message[0].get('commit', {}).get('message'))
                dataToCompare = actualData

    def NewBranchCreated(self, repo, org, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/branches'
        response = requests.get(url, headers=headers)
        initial_branch_names = set(branch['name'] for branch in response.json())
        while True:
            time.sleep(20)
            res = requests.get(url, headers=headers)
            new_branch_names = set(branch['name'] for branch in res.json())
            new_branches = new_branch_names - initial_branch_names
            if new_branches:
                print('New branches created:')
                for new_branch in new_branches:
                    print(new_branch)
                initial_branch_names = new_branch_names

    def NewPersonAddedOnRepo(self, repo, org, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators'
        response = requests.get(url, headers=headers)
        initial_collaborators_names = set(login['login'] for login in response.json())
        while True:
            time.sleep(20)
            res = requests.get(url, headers=headers)
            new_collaborators_names = set(login['login'] for login in res.json())
            new_collaborator = new_collaborators_names - initial_collaborators_names
            if new_collaborator:
                print('new collaborator added:')
                for new_branch in new_collaborator:
                    print(new_branch)
                initial_collaborators_names = new_collaborators_names

if __name__ == "__main__":
    repo = 'TestRepoArea'
    #s_repo = 'task05'
    org = 'TestAreaEpitech'
    #no_org = 'Nathan-Warin'
    BearerToken = 'Bearer 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'
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': BearerToken,
        'X-GitHub-Api-Version': '2022-11-28'
    }
    #NewCommit(repo, org, headers)
    #NewCommit(s_repo, no_org, headers)
    #NewBranchCreated(repo, org, headers)
    tmp = GithubAc()
    tmp.NewPersonAddedOnRepo(repo, org, headers)