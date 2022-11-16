# get most popular websites around a certain topic
import requests
import re 



def scrape(topic):
    # get the html of the page
    html = requests.get("https://www.google.com/search?q=" + topic + "&num=100").text
    # get the links from the html
    links = re.findall(r'href="([^"]+)"', html)
    # filter out the links that are not to websites
    print(links)
    #links = [link for link in links if link.startswith("http")]
    # get the domain of each link
    #domains = [link.split("/")[2] for link in links]
    # count the number of times each domain appears
    #counts = Counter(domains)
    # get the most common domains
    #return counts.most_common(10)
    
if __name__ == "__main__":
    print(scrape("cats"))



