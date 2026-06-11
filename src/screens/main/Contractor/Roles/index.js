import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { showToast } from '../../../../helpers/ToastConfig';
import RolesPermissionsTab from '../../../../components/Contractor/RolesPermissionsTab/RolesPermissionsTab';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
import { useIsFocused } from '@react-navigation/native';
import { hasInternet } from '../../../../helpers/services';
import apiClient from '../../../../helpers/apiClient';
import RolesCard from '../../../../components/Contractor/RoleCard/RoleCard';
import Design from './Design';
const Roles = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const [resources, setResources] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [selectedRoleForPermission, setSelectedRoleForPermission] = useState(
    [],
  );
  const [currentPermissions, setCurrentPermissions] = useState([]);
  const [originalPermissions, setOriginalPermissions] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);
  const [loading, setLoading] = useState(false);
  // Fetch contractor roles when screen comes into focus
  const fetchContractorRoles = useCallback(async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }

    try {
      const contractorRoles = await apiClient.get(`contractor-roles`);
      if (contractorRoles.status === 200 && contractorRoles.data.length > 0) {
        const fetchPermissionResources = await apiClient.get(
          `contractor-roles/metadata/permission-resources`,
        );
        if (fetchPermissionResources.status === 200) {
          const options = fetchPermissionResources.data.resources.map(item => ({
            label: item
              .toLowerCase()
              .replace(/_/g, ' ')
              .replace(/\b\w/g, char => char.toUpperCase()),
            value: item,
          }));

          const defaultRole =
            contractorRoles.data.find(role => role.isDefault) ||
            contractorRoles.data[0];
          if (defaultRole) {
            const roleDetails = await apiClient.get(
              `contractor-roles/${defaultRole.id}`,
            );
            const matrix = roleDetails.data.permissionMatrix || [];
            const resourcesWithPermissions = options.filter(opt => {
              const perm = matrix.find(p => p.resource === opt.value);
              return (
                perm &&
                (perm.canCreate ||
                  perm.canRead ||
                  perm.canUpdate ||
                  perm.canDelete)
              );
            });
            setAllRoles(contractorRoles.data);
            setResources(options);
            setSelectedRoleForPermission(resourcesWithPermissions);
          } else {
            setSelectedRoleForPermission([]);
          }
        }
      }
    } catch (error) {
      showToast('error', error?.response?.message || 'Something went wrong');
      console.log('fetchContractorRoles error', error);
    } finally {
      setIsFirstLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused && !activeModal) {
      fetchContractorRoles();
    }
  }, [isFocused, activeModal, fetchContractorRoles]);

  const defaultSelectedRoleId = useMemo(() => {
    return allRoles.find(role => role.isDefault)?.id ?? allRoles[0]?.id ?? '';
  }, [allRoles]);

  useEffect(() => {
    if (!allRoles.length) {
      setSelectedRoleId('');
      return;
    }
    const selectedRoleStillExists = allRoles.some(
      role => role.id === selectedRoleId,
    );
    console.log(selectedRoleStillExists);
    if (!selectedRoleId || !selectedRoleStillExists) {
      setSelectedRoleId(defaultSelectedRoleId);
    }
  }, [defaultSelectedRoleId, allRoles, selectedRoleId]);

  useEffect(() => {
    const loadRolePermissions = async () => {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        showToast('info', 'No Internet Connection');

        return;
      }

      if (!selectedRoleId) return;
      setLoading(true);
      try {
        const res = await apiClient.get(`contractor-roles/${selectedRoleId}`);
        const matrix = res.data.permissionMatrix || [];
        if (Array.isArray(matrix) && matrix.length > 0) {
          const resourcesWithPermissions = resources.filter(opt => {
            const perm = matrix.find(p => p.resource === opt.value);
            return (
              perm &&
              (perm.canCreate ||
                perm.canRead ||
                perm.canUpdate ||
                perm.canDelete)
            );
          });

          setSelectedRoleForPermission(resourcesWithPermissions);

          setCurrentPermissions(matrix);
          setOriginalPermissions(JSON.parse(JSON.stringify(matrix)));
          setHasChanges(false);
        }
      } catch (err) {
        console.log('loadRolePermissions', err);
      } finally {
        setLoading(false);
      }
    };
    loadRolePermissions();
  }, [selectedRoleId]);

  const onPermissionsChange = useCallback(
    updatedFullMatrix => {
      setCurrentPermissions(updatedFullMatrix);
      const originalMap = new Map(
        originalPermissions.map(item => [item.resource, item]),
      );

      const changed = updatedFullMatrix.some(item => {
        const original = originalMap.get(item.resource);

        return (
          !original ||
          item.canCreate !== original.canCreate ||
          item.canRead !== original.canRead ||
          item.canUpdate !== original.canUpdate ||
          item.canDelete !== original.canDelete
        );
      });

      console.log('changed', changed);

      setHasChanges(changed);
    },
    [originalPermissions],
  );

  const handleSavePermissions = useCallback(async () => {
    if (!selectedRoleId || !hasChanges) return;
    setIsSavingPermissions(true);
    try {
      // Build the complete permission list for all resources
      const permissionsToSave = currentPermissions.map(perm => {
        const isSelected = selectedRoleForPermission.some(
          sel => sel.value === perm.resource,
        );
        if (!isSelected) {
          return {
            ...perm,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          };
        }
        // Keep the existing permissions for selected resources
        return perm;
      });

      await apiClient.put(`contractor-roles/${selectedRoleId}/permissions`, {
        permissions: permissionsToSave,
      });
      showToast('success', 'Permissions updated');
      setOriginalPermissions(JSON.parse(JSON.stringify(permissionsToSave)));
      setHasChanges(false);
      await fetchContractorRoles();
    } catch (err) {
      showToast('error', err?.response?.data?.message || 'Failed to save');
    } finally {
      setIsSavingPermissions(false);
    }
  }, [
    selectedRoleId,
    hasChanges,
    currentPermissions,
    selectedRoleForPermission,
  ]);

  const resourceHasAnyPermission = useMemo(() => {
    const map = {};
    resources.forEach(res => {
      const perm = currentPermissions.find(p => p.resource === res.value);
      map[res.value] =
        perm &&
        (perm.canCreate || perm.canRead || perm.canUpdate || perm.canDelete);
    });
    return map;
  }, [resources, currentPermissions]);

  const filteredResources = useMemo(() => {
    return selectedRoleForPermission;
  }, [selectedRoleForPermission]);

  const onRefresh = useCallback(async () => {
    setIsFirstLoading(true);
    setResources([]);
    setAllRoles([]);
    setSelectedRoleForPermission([]);
    await fetchContractorRoles();
  }, [fetchContractorRoles]);

  const renderPermissionTabs = useCallback(
    ({ item }) => (
      <RolesPermissionsTab
        item={item}
        selectedRoleForPermission={selectedRoleForPermission}
        setSelectedRoleForPermission={setSelectedRoleForPermission}
        hasAnyPermission={resourceHasAnyPermission[item.value] || false}
        setHasChanges={setHasChanges}
      />
    ),
    [selectedRoleForPermission, resourceHasAnyPermission],
  );

  const renderRolesCard = useCallback(
    ({ item }) => (
      <RolesCard
        item={item}
        selectedRoleId={selectedRoleId}
        setSelectedRoleId={setSelectedRoleId}
        openModal={openModal}
        fetchContractorRoles={fetchContractorRoles}
      />
    ),
    [selectedRoleId, openModal, fetchContractorRoles],
  );

  return (
    <Design
      navigation={navigation}
      isLoading={isLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
      allRoles={allRoles}
      renderRolesCard={renderRolesCard}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      isFirstLoading={isFirstLoading}
      resources={resources}
      filteredResources={filteredResources}
      renderPermissionTabs={renderPermissionTabs}
      selectedRoleForPermission={selectedRoleForPermission}
      currentPermissions={currentPermissions}
      hasChanges={hasChanges}
      onPermissionsChange={onPermissionsChange}
      handleSavePermissions={handleSavePermissions}
      isSavingPermissions={isSavingPermissions}
      loading={loading}
    />
  );
};

export default Roles;
