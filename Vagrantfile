VAGRANTFILE_API_VERSION = "2"

# Project Settings
  hostname_project = "bas-style-kit"
  hostname_environment = "dev"
  domain_name = "v.m"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Applies to all VMs
    config.vm.box = "antarctica/trusty"

    # SSH keys
      # Vagrant will replace the default insecure private key with a new random key, this is more secure
      # but makes the use of provisioner's more difficult (as they don't know which key to use).
      # To fix this, the localhost user's public key is added to the vagrant user's authorized_keys file.
      # Provisioning tools will need to configured to use the localhost user's private key when authenticating.
      config.vm.provision "file", source: "~/.ssh/id_rsa.pub", destination: "id_rsa.pub"
      config.vm.provision "shell", inline: 'cat /home/vagrant/id_rsa.pub >> /home/vagrant/.ssh/authorized_keys && rm /home/vagrant/id_rsa.pub'

    # Shared folders
      # /vagrant is not used to ensure consistency across environments [development/staging/production]
      config.vm.synced_folder "./", "/app"
      config.vm.synced_folder '.', '/vagrant', disabled: true

    # Network adapters
      config.vm.network "private_network", type: "dhcp"  # Define Networking

    # Automatic hostname registration
      config.hostmanager.enabled = true
      config.hostmanager.manage_host = true
      config.hostmanager.ignore_private_ip = false
      config.hostmanager.include_offline = true

    # Host configuration
      config.trigger.before :up do
        run "ansible-galaxy install https://github.com/antarctica/ansible-prelude,v0.1.2 --roles-path=provisioning/roles_bootstrap  --no-deps --force"
      end

  # VMs
  config.vm.define hostname_project + "-" + hostname_environment + "-" + "web1" + "." + domain_name do |vm1|

    vm1.vm.hostname = hostname_project + "-" + hostname_environment + "-" + "web1" + "." + domain_name  # Define hostname

    # Provision using ansible
      # Due to bug[1] in Vagrant this block MUST be in the LAST VM specified in this Vagrantfile
      # [1] https://github.com/mitchellh/vagrant/issues/1784

        # Prelude - perform project setup on local machine
          vm1.vm.provision "ansible" do |ansible|

            # Standard configuration
              ansible.inventory_path = 'provisioning/local'
              ansible.limit = 'all'

            # Playbook specific configuration
              ansible.playbook = 'provisioning/prelude.yml'
          end

        # Bootstrap - adds controller user with public keys
        vm1.vm.provision "ansible" do |ansible|

          # Standard configuration
            ansible.limit = 'all'

          # Playbook specific configuration
            ansible.playbook = 'provisioning/bootstrap-vagrant.yml'
        end
  end
end
